const express = require("express")
const router = express.Router()
const moment = require("moment")
const { models } = require("../database/database")
const { stock } = require("../database/models/book")
const { getMissingValues } = require("./utils")

router.get("/", async (req, res) => {
    // get all loans
    const loans = await models.Loan.findAll()

    res.status(200).send({ loans: loans })
})

router.get("/:id/", async (req, res) => {

    const id = req.params.id

    // validate id
    if (!id) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: "missing loan id"
        })
    }

    const loan = await models.Loan.findAll({
        where: {
            id: id
        }
    })

    res.status(200).send({loan: loan[0]})
})

router.post("/", async (req, res) => {
    // read body of the request
    const requestLoan = req.body

    const loan = {
        user: requestLoan.user,
        date: requestLoan.date,
        returnDate: requestLoan.returnDate,
        bookCode: requestLoan.bookCode,
    }

    // validate that the request has no missing values
    const missingValues = getMissingValues(loan)
    if (missingValues.length > 0) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: `following properties are missing: ${missingValues.toString()}`
        })
    }

    //validate loan already exists
    const loanExists = await models.Loan.findAll({
        where: {
            bookCode: loan.bookCode,
            user: loan.user
        }
    })
    if (loanExists.length > 0) {
        return res.status(409).send({
            error: "LOAN ALREADY EXISTS",
            detail: `the user ${loan.user} already lent the book with code ${loan.bookCode}`
        })
    }

    // validate loan dates
    const isValidDates = moment(loan.returnDate).diff(loan.date)
    if (isValidDates < 0) {
        return res.status(400).send({
            error: "BAD DATES",
            detail: "returnDate can not be before date"
        })
    }

    // validate stock
    const books = await models.Book.findAll({
        where: {
            code: loan.bookCode,
        }
    })
    if (books.length > 0) {
        const book = books[0]
        if (book.stock <= 0) {
            return res.status(500).send({
                error: "BOOK HAS NO STOCK",
                detail: `book with code ${loan.bookCode} has no stock`
            })
        }

        // update stock
        await models.Book.update({stock: book.stock - 1}, {
            where: {
                code: book.code
            }
        })
    } else {
        return res.status(400).send({
            error: "BOOK DO NO EXISTS",
            detail: `book with code ${loan.bookCode} do not exists`
        })
    }

    // create the loan
    const newLoan = await models.Loan.create(loan)
    res.status(201).send(newLoan)

})

router.delete("/:bookCode/:user", async (req, res) => {
    // delete a loan = return the book
    const returnLoan = req.params

    // validate that the request has no missing values
    const missingValues = getMissingValues(returnLoan)
    if (missingValues.length > 0) {
        return res.status(400).send({
            error: "BAD REQUEST",
            detail: `following properties are missing: ${missingValues.toString()}`
        })
    }

    // validate if loan exists
    const loan = await models.Loan.findAll({
        where: {
            bookCode: returnLoan.bookCode,
            user: returnLoan.user,
        }
    })
    if (loan.length === 0) {
        return res.status(204).send()
    }

    // delete the loan
    await models.Loan.destroy({
        where: {
            bookCode: returnLoan.bookCode,
            user: returnLoan.user,
        }
    })

    // update stock
    const books = await models.Book.findAll({
        where: {
            code: returnLoan.bookCode,
        }
    })
    await models.Book.update({stock: books[0].stock + 1}, {
        where: {
            code:  returnLoan.bookCode
        }
    })

    res.status(204).send()
})


module.exports = router