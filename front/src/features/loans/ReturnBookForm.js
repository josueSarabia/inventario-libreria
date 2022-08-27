import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { httpDelete } from '../../http'
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'

function ReturnBookForm() {
    const [user, setUser] = useState('')
    const [bookCode, setBookCode] = useState('')


    const [errorUser, setErrorUser] = useState(false)
    const [errorBookCode, setErrorBookCode] = useState(false)


    const [helperTextUser, setHelperTextUser] = useState('')
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
        setBookCode('')
        setInvalidForm(true)
    }

    const save = () => {
        setLoading(true)
        /* const returnLoan = {
            user: user,
            bookCode: bookCode
        } */
        httpDelete(`loans/${bookCode}/${user}`,).then((res) => {
            setLoading(false)
            cleanForm()
            Swal.fire({
                title: 'Devolucion realizada',
                icon: 'success',
                confirmButtonText: 'Entendido'
              })
        }).catch((e) => {
            setLoading(false)
            cleanForm()
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
            
            <Grid container spacing={1} sx={{marginBottom: '15px', justifyContent: 'center'}}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <LoadingButton
                        endIcon={<SendIcon />}
                        onClick={() => {save()}}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        disabled={loading || invalidForm || !user || !bookCode}
                        >
                        Realizar devolucion
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export {ReturnBookForm}