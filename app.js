const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static(__dirname + '/views'))
const PORT = 9999
const CrudDiabetics = require('./models/crudDiabetic')
const JDATA = {
    userID: "ke01",
    weight: 70,
    parents: [
        { name: "Daddy", lastname: "Eiamsaard" },
        { name: "Mommy", lastname: "Eiamsaard" },
    ]
}
app.get("/welcome", (req, res) => {
    res.send("Hello world")
})

app.get("/ex04/:beauty", (req, res) => {
    res.send(req.params.beauty)
})

app.get("/jsonContent", (req, res) => {
    res.json(JDATA)
})

app.get("/htmlContent", (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post("/ex05", (req, res) => {
    res.send(req.body.userID + " - " + req.body.fullname)
})

app.post("/calculator", (req, res) => {
    const a = req.body.operandA
    const b = req.body.operandB
    const op = req.body.operator

    console.log(eval(a + op + b))
    res.send(new String(eval(a + op + b)))
})

app.post("/diabetic", (req, res) => {

    CrudDiabetics.doInsert(req.body)

    res.sendStatus(201).end()
})
app.get("/diabetic/:userID", async(req, res) => {
    console.log(`Search key = ${req.params.userID}`)
    const key = { userID: req.params.userID.toString() }
    const result = await CrudDiabetics.doSearch(key)
    res.json(result).end()
})

app.put("/newDiabetic/:userid", async(req, res) => {
    await CrudDiabetics.doSearch({ "userID": req.params.userid })
        .then(async(data) => {
            //send data._id to crud for update
            console.log(data.userID)
            await CrudDiabetics.doUpdate(data._id, req.body)
                .then(() => {
                    res.sendStatus(204).end()
                })
        })
        .catch((err) => {
            res.sendStatus(500).end()
        })
})
app.delete("/del/:userid", async(req, res) => {
    await CrudDiabetics.doSearch({ "userID": req.params.userid })
        .then(async(data) => {
            await CrudDiabetics.doRemove(data._id)
                .then(() => {
                    res.sendStatus(204).end()
                })
                .catch(() => {
                    res.sendStatus(500).end()
                })
        })

})
app.listen(PORT, (req, res) => {
    console.log(`Application is running on ${PORT}`)
})