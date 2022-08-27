import * as React from 'react'
import Box from '@mui/material/Box';
import {
    Route,
    Routes
  } from "react-router-dom";
import { Toolbar } from '@mui/material';
import {Inventory} from '../features/inventory/Inventory'
import {AddBook} from '../features/books/AddBook'
import {Loans} from '../features/loans/Loans'

const drawerWidth = 240;

function Content() {
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar></Toolbar>
            <Routes>
                <Route path="/" element={<Inventory />}></Route>
                <Route path="/add-book" element={<AddBook />}></Route>
                <Route path="/loans" element={<Loans />}></Route>
            </Routes>
        </Box>
    )
}

export { Content }