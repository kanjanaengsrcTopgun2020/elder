const DBCONNECT = require('./DBConnect')
const Schema = DBCONNECT.Schema
const diabeticSchema = new Schema({
    userID: {
        type: String
    },
    fullname: {
        type: String
    },
    timestamps: [{
        time: {
            type: String
        },
        bloodSugar: {
            type: Number
        },
        detectorLicenseID: {
            type: String
        }
    }]
}, { timestamps: true, versionKey: false })
const DiabeticModel = DBCONNECT.model('diabetics', diabeticSchema)

module.exports = DiabeticModel