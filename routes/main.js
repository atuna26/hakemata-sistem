const express = require("express")
const router = express.Router()
const League = require("../models/League")
const Team = require("../models/Team")
const Fixture = require("../models/Fixture")
const Referee = require("../models/Post")
const Group = require("../models/Group")



router.get("/", async (req,res) =>{
    const league = await League.find();
    const leagueCount = league.length;
    const team = await Team.find();
    const teamCount = team.length;
    const fixture = await Fixture.find();
    const fixtureCount = fixture.length;
    const referee = await Referee.find();
    const refereeCount = referee.length;
    res.render("site/index", {leagueCount,teamCount,fixtureCount,refereeCount})
})
router.get("/fikstur",async (req,res) =>{
    const fixture = await Fixture.find();
    const fixtureCount = fixture.length;
    res.render("atamalar/fiksturAtama", {fixtureCount})
})

router.get("/hakem",async (req,res) =>{
    res.render("atamalar/hakemAtama")
})

router.post("/fikstur/matchDate",async (req,res) =>{
    const X = new Date(req.body.dateSearchBegin); // set your date range
    const Y = new Date(req.body.dateSearchFinal);

    const countTotalMatch = await Fixture.countDocuments({
        $and: [
            {
              derbyDate: {
                $gte: new Date(X),
                $lte: new Date(Y)
              }
            },
            {
              $or: [
                { secondVarReferee: null },
                { varReferee: null },
                { fourthReferee: null },
                { middleReferee: null },
                { linemanReferee: null },
                { secondLinemanReferee: null },
              ]
            }
          ]
    })

    const countMatchReferee = await Fixture.countDocuments({
        $and: [
            {
              derbyDate: {
                $gte: new Date(X),
                $lte: new Date(Y)
              }
            },
            {
              $or: [
                { secondVarReferee:  { $ne: null } },
                { varReferee:  { $ne: null } },
                { fourthReferee:  { $ne: null } },
                { middleReferee:  { $ne: null } },
                { linemanReferee:  { $ne: null } },
                { secondLinemanReferee:  { $ne: null } },
              ]
            }
          ]
    });
    const countMatch = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        middleReferee: null,
        secondVarReferee: null,
        secondLinemanReferee: null,
        fourthReferee: null,
        varReferee: null,
        secondVarReferee: null,

    });

    const countSecondVarReferee = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        secondVarReferee: { $ne: null },
    });

    // Count the number of fixtures where secondVarReferee is null
    const countSecondVarRefereeNull = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        secondVarReferee: null
    });

    const countVarReferee = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        VarReferee: { $ne: null },
    });

    // Count the number of fixtures where varReferee is null
    const countVarRefereeNull = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        varReferee: null
    });

    const countFourthReferee = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        fourthReferee: { $ne: null },
    });

    // Count the number of fixtures where fourthReferee is null
    const countFourthRefereeNull = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        fourthReferee: null
    });

    const countMiddleReferee = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        middleReferee: { $ne: null },
    });


    // Count the number of fixtures where middleReferee is null
    const countMiddleRefereeNull = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        middleReferee: null
    });

    const countLinemanReferee = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        linemanReferee: { $ne: null },
    });

    // Count the number of fixtures where linemanReferee is null
    const countLinemanRefereeNull = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        linemanReferee: null
    });

    const countSecondLinemanReferee = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        secondLinemanReferee: { $ne: null },
    });

    // Count the number of fixtures where secondLinemanReferee is null
    const countSecondLinemanRefereeNull = await Fixture.countDocuments({
        derbyDate: {
            $gte: new Date(X),
            $lte: new Date(Y)
        },
        secondLinemanReferee: null
    });

    Fixture.find({
        $and: [
            {
              derbyDate: {
                $gte: new Date(X),
                $lte: new Date(Y)
              }
            },
            {
              $or: [
                { secondVarReferee: null },
                { varReferee: null },
                { fourthReferee: null },
                { middleReferee: null },
                { linemanReferee: null },
                { secondLinemanReferee: null },
              ]
            }
          ]
    }).lean().then(fixture =>{
        Referee.find({}).lean().then(referee =>{
            res.render("atamalar/fiksturAtama", {
                fixture:fixture,
                referee:referee,
                countMatch:countMatch,
                countSecondVarRefereeNull: countSecondVarRefereeNull,
                countVarRefereeNull: countVarRefereeNull,
                countFourthRefereeNull: countFourthRefereeNull,
                countMiddleRefereeNull: countMiddleRefereeNull,
                countLinemanRefereeNull: countLinemanRefereeNull,
                countSecondVarReferee:countSecondVarReferee,
                countTotalMatch:countTotalMatch,
                countMatchReferee:countMatchReferee,
                countSecondLinemanRefereeNull: countSecondLinemanRefereeNull,
                sumReferee:countSecondVarReferee+countVarReferee+countFourthReferee+countLinemanReferee+countMiddleReferee+countSecondLinemanReferee,
                sumRefereeNull:countSecondVarRefereeNull+countVarRefereeNull+countFourthRefereeNull+countLinemanRefereeNull+countMiddleRefereeNull+countSecondLinemanRefereeNull
            });
        })
    })
})

router.get("/optimizasyon",(req,res) =>{
    return res.render("site/optimizasyon")
})





module.exports = router