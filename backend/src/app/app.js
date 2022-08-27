const express = require("express")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


const booksRouter = require("../routers/booksRouter")
const loansRouter = require("../routers/loansRouter")


app.use("/books", booksRouter)
app.use("/loans", loansRouter)


module.exports = app