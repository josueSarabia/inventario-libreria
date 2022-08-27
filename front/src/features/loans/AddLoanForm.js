import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { post } from '../../http'
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
import { DatePicker } from '../../components/datepickers/DatePicker'
import moment from 'moment'

function AddLoanForm() {
    const [user, setUser] = useState('')
    const [date, setDate] = useState(moment())
    const [returnDate, setReturnDate] = useState(moment().add(7, 'd'))
    const [bookCode, setBookCode] = useState('')


    const [errorUser, setErrorUser] = useState(false)
    const [errorDate, setErrorDate] = useState(false)
    const [errorReturnDate, setErrorReturnDate] = useState(false)
    const [errorBookCode, setErrorBookCode] = useState(false)


    const [helperTextUser, setHelperTextUser] = useState('')
    const [helperTextDate, setHelperTextDate] = useState('')
    const [helperTextReturnDate, setHelperTextReturnDate] = useState('')
    const [helperTextBookCode, setHelperTextBookCode] = useState('')


    const [loading, setLoading] = useState(false)
    const [invalidForm, setInvalidForm] = useState(true)

    const notEmpty = (callback, helperCallback, value) => {
        if (!value && value !== 0) {
            callback(true)
            helperCallback('Campo obligatorio')
            setInvalidForm(true)
            return true
        }

        return false
    }

    const validateNotEmpty = (callback, errorCallback, helperCallback, value) => {
        const isEmpty = notEmpty(errorCallback, helperCallback, value)
        if (isEmpty) {
            return
        }

        callback(value)
        errorCallback(false)
        helperCallback('')
        setInvalidForm(false)
    }


    const cleanForm = () => {
        setUser('')
        setDate(moment())
        setReturnDate(moment().add(7, 'd'))
        setBookCode('')
        setInvalidForm(true)
    }

    const save = () => {
        setLoading(true)
        const loan = {
            user: user,
            date: date.format('YYYY-MM-DD'),
            returnDate: returnDate.format('YYYY-MM-DD'),
            bookCode: bookCode
        }
        post('loans/', loan).then((res) => {
            setLoading(false)
            cleanForm()
            Swal.fire({
                title: 'Prestamo realizado',
                icon: 'success',
                confirmButtonText: 'Entendido'
              })
        }).catch((e) => {
            setLoading(false)
            let message = 'Error desconocido porfavor intente mas tarde'
            if (e.error === 'LOAN ALREADY EXISTS') {
                message = 'Usuario ya tiene un prestamo con este libro'
            } else if (e.error === 'BAD DATES') {
                message = 'La fecha de devolucion no puede ser anterior a la fecha de inicio'
            } else if (e.error === 'BOOK HAS NO STOCK') {
                message = 'Libro no tiene stock'
            } else if (e.error === 'BOOK DO NO EXISTS') {
                message = 'El libro que quiere prestar no existe'
            }
            Swal.fire({
                title: message,
                icon: 'error',
                confirmButtonText: 'Entendido'
            })
        })
    }

    return (
        <Box sx={{ margin: 'auto', maxWidth: '500px' }}>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={12}>
                    <TextField
                        inputProps={{ sx: {background: '#fff'} }}
                        error={errorBookCode}
                        onChange={(e) => validateNotEmpty(setBookCode, setErrorBookCode, setHelperTextBookCode, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setBookCode, setErrorBookCode, setHelperTextBookCode, e.target.value)}
                        helperText={helperTextBookCode}
                        fullWidth 
                        label="Codigo"
                        variant="outlined"
                        value={bookCode}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={12}>
                    <TextField 
                        inputProps={{ sx: {background: '#fff'} }}
                        error={errorUser}
                        onChange={(e) => validateNotEmpty(setUser, setErrorUser, setHelperTextUser, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setUser, setErrorUser, setHelperTextUser, e.target.value)}
                        helperText={helperTextUser}
                        fullWidth
                        label="Usuario"
                        variant="outlined"
                        value={user}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={6}>
                    <DatePicker label={'Inicio'} date={date} handleChange={setDate} ></DatePicker>
                </Grid>
                <Grid item xs={6}>
                    <DatePicker label={'Fin'} date={returnDate} handleChange={setReturnDate} ></DatePicker>
                </Grid>
            </Grid>
            
            <Grid container spacing={1} sx={{marginBottom: '15px', justifyContent: 'center'}}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <LoadingButton
                        endIcon={<SendIcon />}
                        onClick={() => {save()}}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        disabled={loading || invalidForm || !user || !bookCode || !date || !returnDate}
                        >
                        Guardar
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export {AddLoanForm}