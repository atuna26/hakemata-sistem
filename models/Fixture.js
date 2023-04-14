const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const FixtureSchema = new mongoose.Schema({
    groupId: {type: Schema.Types.ObjectId, ref: "Group"},
    homeTeam: {type:String, required:true },
    awayTeam: {type:String, required:true},
    derbyDate: {type:Date},
    middleReferee: { type: Schema.Types.ObjectId, ref: "referee"},
    linemanReferee: { type: Schema.Types.ObjectId, ref: "referee"},
    secondLinemanReferee: { type: Schema.Types.ObjectId, ref: "referee"},
    fourthReferee: {type:Schema.Types.ObjectId,ref:"referee"},
    varReferee: {type:Schema.Types.ObjectId,ref:"referee"},
    secondVarReferee: {type:Schema.Types.ObjectId, ref:"referee"},
    date: {type:Date, default:Date.now}
})
module.exports = mongoose.model("Fixture", FixtureSchema)
