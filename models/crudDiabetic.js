const DiabeticMedel = require("./diabetic")

let insert = (inputData) => {
    const data = new DiabeticMedel(inputData)
    data.save()
        .then((res) => {
            console.log(`Insert ${res} to database`)
        })
        .catch((err) => {
            console.log('Cannot insert to diabetic collection')
        })
}
let search = (key) => {
    console.log(key)
    const result = DiabeticMedel.findOne(key, (err, res) => {
        if (err) {
            console.log(`Cannot search from diabetics collection ${err}`)
            throw err
        }
    })
    console.log(result)
    return result
}
let update = async(id, newData) => {
    console.log(`id in update ${id}`)
    console.log(newData)
    await DiabeticMedel.findByIdAndUpdate(
            id, { $set: { "timestamps": newData } }
        )
        .then(() => {
            console.log('Update data complete')
        })
        .catch((err) => {
            console.log('Cannot update data')
            throw err
        })

}
let del = async(id) => {
    await DiabeticMedel.findByIdAndRemove(id).exec()
        .then(() => {
            console.log('Delete data complete')
        })
        .catch((err) => {
            console.log('Cannot delete')
        })
}
var crud = {
    doInsert: insert,
    doSearch: search,
    doUpdate: update,
    doRemove: del
}

module.exports = crud