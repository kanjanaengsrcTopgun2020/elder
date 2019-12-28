const DBCONNECT = require('mongoose')
const URL = 'mongodb://192.168.56.113:27017/ElderMornitoring'
const OPTS = {
    user: 'appuser',
    pass: 'BigGun2020',
    useNewUrlParser: true,
    useUnifiedTopology: true
}
DBCONNECT.connect(URL, OPTS, (err) => {
    if (err) {
        console.log('Cannot connect to mongoDB')
        throw err
    }
    console.log('Connected to database')
})
module.exports = DBCONNECT