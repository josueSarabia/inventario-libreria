import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { post } from '../../http'
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'

function AddBook() {
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [autor, setAutor] = useState('')
    const [category, setCategory] = useState('')
    const [placeOfEdition, setPlaceOfEdition] = useState('')
    const [editorial, setEditorial] = useState('')
    const [year, setYear] = useState('')
    const [numberOfPages, setNumberOfPages] = useState('')
    const [stock, setStock] = useState('')

    const [errorTitle, setErrorTitle] = useState(false)
    const [errorCode, setErrorCode] = useState(false)
    const [errorAutor, setErrorAutor] = useState(false)
    const [errorCategory, setErrorCategory] = useState(false)
    const [errorPlaceOfEdition, setErrorPlaceOfEdition] = useState(false)
    const [errorEditorial, setErrorEditorial] = useState(false)
    const [errorYear, setErrorYear] = useState(false)
    const [errorNumberOfPages, setErrorNumberOfPages] = useState(false)
    const [errorStock, setErrorStock] = useState(false)

    const [helperTextTitle, setHelperTextTitle] = useState('')
    const [helperTextCode, setHelperTextCode] = useState('')
    const [helperTextAutor, setHelperTextAutor] = useState('')
    const [helperTextCategory, setHelperTextCategory] = useState('')
    const [helperTextPlaceOfEdition, setHelperTextPlaceOfEdition] = useState('')
    const [helperTextEditorial, setHelperTextEditorial] = useState('')
    const [helperTextYear, setHelperTextYear] = useState('')
    const [helperTextNumberOfPages, setHelperTextNumberOfPages] = useState('')
    const [helperTextStock, setHelperTextStock] = useState('')

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

    const isNumber = (callback, helperCallback, value) => {
        const reg = new RegExp("^[0-9]+$")
        if (!reg.test(value)) {
            callback(true)
            helperCallback('Solo valores numericos')
            setInvalidForm(true)
            return false
        }

        return true
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

    const validateOnlyNumbers = (callback, errorCallback, helperCallback, value) => {
        const isEmpty = notEmpty(errorCallback, helperCallback, value)
        if (isEmpty) {
            return
        }

        const isValidNumber = isNumber(errorCallback, helperCallback, value)
        if (!isValidNumber) {
            return
        }

        callback(value)
        errorCallback(false)
        helperCallback('')
        setInvalidForm(false)
    }

    const cleanForm = () => {
        setTitle('')
        setCode('')
        setAutor('')
        setCategory('')
        setPlaceOfEdition('')
        setEditorial('')
        setYear('')
        setNumberOfPages('')
        setStock('')
        setInvalidForm(true)
    }

    const save = () => {
        setLoading(true)
        const book = {
            autor: autor,
            title: title,
            category: category,
            code: code,
            placeOfEdition: placeOfEdition,
            editorial: editorial,
            year: year,
            numberOfPages: numberOfPages,
            stock: stock,
        }
        post('books/', book).then((res) => {
            setLoading(false)
            cleanForm()
            Swal.fire({
                title: 'Libro guardado',
                icon: 'success',
                confirmButtonText: 'Entendido'
              })
        }).catch((e) => {
            setLoading(false)
            Swal.fire({
                title: 'Error libro ya existe',
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
                        error={errorCode}
                        onChange={(e) => validateNotEmpty(setCode, setErrorCode, setHelperTextCode, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setCode, setErrorCode, setHelperTextCode, e.target.value)}
                        helperText={helperTextCode}
                        fullWidth 
                        label="Codigo"
                        variant="outlined"
                        value={code}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={12}>
                    <TextField 
                        inputProps={{ sx: {background: '#fff'} }}
                        error={errorTitle}
                        onChange={(e) => validateNotEmpty(setTitle, setErrorTitle, setHelperTextTitle, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setTitle, setErrorTitle, setHelperTextTitle, e.target.value)}
                        helperText={helperTextTitle}
                        fullWidth
                        label="Titulo"
                        variant="outlined"
                        value={title}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={6}>
                    <TextField
                        inputProps={{ sx: {background: '#fff'} }}
                        error={errorAutor}
                        onChange={(e) => validateNotEmpty(setAutor, setErrorAutor, setHelperTextAutor, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setAutor, setErrorAutor, setHelperTextAutor, e.target.value)}
                        helperText={helperTextAutor}
                        fullWidth
                        label="Autor"
                        variant="outlined"
                        value={autor}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        inputProps={{ sx: {background: '#fff'} }}
                        error={errorCategory}
                        onChange={(e) => validateNotEmpty(setCategory, setErrorCategory, setHelperTextCategory, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setCategory, setErrorCategory, setHelperTextCategory, e.target.value)}
                        helperText={helperTextCategory}
                        fullWidth
                        label="Categoria"
                        variant="outlined"
                        value={category}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={6}>
                    <TextField
                        inputProps={{ sx: {background: '#fff'} }}
                        error={errorPlaceOfEdition}
                        onChange={(e) => validateNotEmpty(setPlaceOfEdition, setErrorPlaceOfEdition, setHelperTextPlaceOfEdition, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setPlaceOfEdition, setErrorPlaceOfEdition, setHelperTextPlaceOfEdition, e.target.value)}
                        helperText={helperTextPlaceOfEdition}
                        fullWidth
                        label="Lugar de edicion"
                        variant="outlined"
                        value={placeOfEdition}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        inputProps={{ sx: {background: '#fff'} }}
                        error={errorEditorial}
                        onChange={(e) => validateNotEmpty(setEditorial, setErrorEditorial, setHelperTextEditorial, e.target.value)}
                        onBlur={(e) => validateNotEmpty(setEditorial, setErrorEditorial, setHelperTextEditorial, e.target.value)}
                        helperText={helperTextEditorial}
                        fullWidth
                        label="Editorial"
                        variant="outlined"
                        value={editorial}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={6}>
                    <TextField
                        error={errorYear}
                        onChange={(e) => validateOnlyNumbers(setYear, setErrorYear, setHelperTextYear, e.target.value)}
                        onBlur={(e) => validateOnlyNumbers(setYear, setErrorYear, setHelperTextYear, e.target.value)}
                        helperText={helperTextYear}
                        inputProps={{ sx: {background: '#fff'} }}
                        fullWidth
                        label="Año de edicion"
                        variant="outlined"
                        value={year}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        error={errorNumberOfPages}
                        onChange={(e) => validateOnlyNumbers(setNumberOfPages, setErrorNumberOfPages, setHelperTextNumberOfPages, e.target.value)}
                        onBlur={(e) => validateOnlyNumbers(setNumberOfPages, setErrorNumberOfPages, setHelperTextNumberOfPages, e.target.value)}
                        helperText={helperTextNumberOfPages}
                        inputProps={{ sx: { background: '#fff' } }}
                        fullWidth
                        label="Numero de paginas"
                        variant="outlined"
                        value={numberOfPages}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{marginBottom: '15px'}}>
                <Grid item xs={6}>
                    <TextField
                        error={errorStock}
                        onChange={(e) => validateOnlyNumbers(setStock, setErrorStock, setHelperTextStock, e.target.value)}
                        onBlur={(e) => validateOnlyNumbers(setStock, setErrorStock, setHelperTextStock, e.target.value)}
                        helperText={helperTextStock}
                        inputProps={{sx: {background: '#fff'} }}
                        fullWidth
                        label="Stock"
                        variant="outlined"
                        value={stock}
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
                        disabled={loading || invalidForm || !title || !code || !autor || !category || !placeOfEdition || !editorial || !year || !numberOfPages || !stock}
                        >
                        Guardar
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export {AddBook}