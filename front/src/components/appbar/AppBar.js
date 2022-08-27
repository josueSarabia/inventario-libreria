import * as React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useLocation } from 'react-router-dom';

function AppBarComponent({handleDrawerToggle}) {
    const location = useLocation();
    
    const translateLocation = (path) => {
        if (path === '/') {
            return 'Inventario'
        } else if (path === '/add-book') {
            return 'Agregar libro'
        } else if (path === '/loans') {
            return 'Prestamos'
        } 
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
              }}
            color="primary"
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Mi Libreria App - {translateLocation(location.pathname)}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export { AppBarComponent }