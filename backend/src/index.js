require('dotenv').config()
const app = require("./app/app")
const db = require("./database/database")
const port = 3001

async function main () {
    try {
        await db.authenticate()
        console.log("connected to db")
    } catch (error) {
        console.error("error with db connection: ", error)
    }

    app.listen(port, () => {
        console.log('server listening on port', port)
    })
}

main()
