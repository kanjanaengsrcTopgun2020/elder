const DBCONNECT = require('./DBConnect')
const Schema = DBCONNECT.Schema
const testSchema = new Schema({
    name: {
        type: String,
    },
    camelCapp: {
        type: Number,
    }
}, { versionKey: false, timestamps: true })

const TestCollection = DBCONNECT.model('fakeCollection', testSchema)
const data = new TestCollection({
    name: "Kanjana Eiamsaard",
    camelCapp: 44.44
})
data.save()
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
        throw error
    })