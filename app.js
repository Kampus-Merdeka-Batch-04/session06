const express = require("express")
const app = express()
const fs = require("fs")
const PORT = 3000

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {

  const data = fs.readFileSync("./data.json")

  const dataJson = JSON.parse(data)

  res.render("home", {
    data: dataJson
  })
})

app.get("/name", (req, res) => {

  const {
    first_name : firstName,
    last_name: lastName
  } = req.query

  res.render("name", {
    firstName,
    lastName
  })
})

app.get("/add-name", (req, res) => {
  res.render("add-name")
})

app.post("/add-new-name", (req, res) => {

  const {
    first_name,
    last_name
  } = req.body
  
  const data = fs.readFileSync("./data.json")

  const dataJson = JSON.parse(data)

  dataJson.push({
    first_name,
    last_name
  })

  fs.writeFileSync("./data.json", JSON.stringify(dataJson))

  res.redirect("/")
})

app.listen(PORT, () => {
  console.log("this app running on port: " + PORT);
})