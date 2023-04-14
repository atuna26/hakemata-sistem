const express = require("express")
const router = express.Router()
const Referee = require("../models/Post")
const League = require("../models/League")
const Fixture = require("../models/Fixture")
const Group = require("../models/Group")
const team = require("../models/Team")

router.get("",(req,res )=>{
  Referee.find({}).sort({refereeName:1}).lean().then(referee=>{
    League.find({}).sort({leagueName: 1}).lean().then(league =>{
      Group.find({}).populate({path:"leagueName", model: League}).sort({date:1}).lean().then(group =>{
        Fixture.find({}).lean().then(fixture =>{
          res.render("site/fikstür", {league:league,fixture:fixture,referee:referee,group:group})
      })
      })      
  })
  })
})

router.post("/league", async (req, res) => {
  const existingFixture = await Fixture.findOne({ groupId: req.body.scheduleLeague });
  if(existingFixture){
    req.session.sessionFlash={
      type: "uk-alert-warning",
      message:"Bu lig için zaten bir fikstür oluşturulmuş."
  };
  res.redirect("/ayarlar/fixture")}
  else{
  try {
    const groupNo = req.body.scheduleLeague;
    const group = await Group.findById(groupNo).populate("teamName");
    const teams = group.teamName;

    // Takımlar arasındaki tüm müsabakaları oluştur
    const fixtures = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const homeTeam = teams[i].teamName;
        const awayTeam = teams[j].teamName;
        const fixture1 = new Fixture({
          groupId: groupNo,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
        });
        const fixture2 = new Fixture({
          groupId: groupNo,
          homeTeam: awayTeam,
          awayTeam: homeTeam,
        });
        await fixture1.save();
        await fixture2.save();
        fixtures.push(fixture1);
        fixtures.push(fixture2);

      }
    }

    res.redirect(`/ayarlar/fixture`)
  } catch (error) {
    console.log(error)
    req.session.sessionFlash = {
        type: "uk-alert-danger",
        message: error.message
    }
    res.redirect(`/ayarlar/fixture`)
    }
  }
});
  
router.put("/:id/", (req,res) => {
    Fixture.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new: true}).then(fixture => {
        // res.redirect(`/ayarlar/fixture`)
    })
})
module.exports = router