import { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { get } from '../../http'

function Inventory() {
    const [books, setBooks] = useState([])


    useEffect(() => {
        get('books/').then((res) => {
            setBooks(res.inventory)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 240 }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Codigo</TableCell>
                        <TableCell align="center">Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow
                            key={book.code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{book.code}</TableCell>
                                <TableCell align="center">{book.stock}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export {Inventory}