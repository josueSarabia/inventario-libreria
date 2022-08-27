const express = require("express")
const router = express.Router()
const { models } = require("../database/database")
const { getMissingValues } = require("./utils")


router.get("/", async (req, res) => {
    // GET inventory
    const inventory = await models.Book.findAll({
        attributes: ['code', 'stock']
    })

    res.status(200).send({ inventory: inventory })
})

router.get("/:code/", async (req, res) => {
    const code = req.params.code

    // validate code
    if (!code) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: "missing book code"
        })
    }

    const book = await models.Book.findAll({
        where: {
            code: code
        }
    })

    res.status(200).send({book: book[0]})
})

router.post("/", async (req, res) => {
    // read body of the request
    const bookRequest = req.body

    const book = {
        autor: bookRequest.autor,
        title: bookRequest.title,
        category: bookRequest.category,
        code: bookRequest.code,
        placeOfEdition: bookRequest.placeOfEdition,
        editorial: bookRequest.editorial,
        year: bookRequest.year,
        numberOfPages: bookRequest.numberOfPages,
        stock: bookRequest.stock || 1
    }

    // validate that the request has no missing values
    const missingValues = getMissingValues(book)
    if (missingValues.length > 0) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: `following properties are missing: ${missingValues.toString()}`
        })
    }

    // find if the book already exixts
    const isBookInDB = await models.Book.findAll({
        where: {
            code: book.code
        }
    })
    if (isBookInDB.length > 0) {
        return res.status(409).send({
            error: "BOOK ALREADY EXISTS",
            detail: `the book with code ${book.code} already exists`
        })
    }

    // create the book
    const newBook = await models.Book.create(book)
    res.status(201).send(newBook)
})

router.put("/", async (req, res) => {
    const book = req.body
    // validate code
    if (!book.code) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: "missing book code"
        })
    }

    const missingValues = getMissingValues(book)
    if (missingValues.length > 0) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: `following properties are missing: ${missingValues.toString()}`
        })
    }

    // update the book
    await models.Book.update(book, {
        where: {
            code: book.code
        }
    })
    res.status(204).send()

})

router.delete("/:code/", async (req, res) => {

    const code = req.params.code

    // find if the book exixts
    const isBookInDB = await models.Book.findAll({
        where: {
            code: code
        }
    })
    if (isBookInDB.length === 0) {
        return res.status(204).send()
    }


    // cant delete if book has open loans
    const bookLoans = await models.Loan.findAll({
        where: {
            bookCode: code
        }
    })
    if (bookLoans.length > 0) {
        return res.status(409).send({
            error: "BAD REQUEST",
            detail: `cant delete the book with code ${code} because the book has pending loans `
        })
    }

    // delete the book
    await models.Book.destroy({
        where: {
            code: code
        }
    })

    res.status(204).send()

})


module.exports = router