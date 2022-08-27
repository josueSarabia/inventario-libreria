require('dotenv').config()
const db = require("./database")


async function sync() {
    try {
        await db.authenticate()
        console.log("connected to db")
        db.sync({ force: true })
    } catch (error) {
        console.error("error with db connection: ", error)
    }
}

sync()
