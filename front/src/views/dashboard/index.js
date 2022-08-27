import * as React from 'react'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {ResponsiveDrawer} from '../../components/drawer/Drawer'
import {AppBarComponent} from '../../components/appbar/AppBar'
import {Content} from '../../routes/index'

const themeDark = createTheme ({
    palette: {
      background: {
        default: "#e3f2fd"
      },
    }
  });

function Dashboard({window}) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <ThemeProvider theme={themeDark}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarComponent handleDrawerToggle={handleDrawerToggle}></AppBarComponent>
                <ResponsiveDrawer 
                    window={window}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}>
                </ResponsiveDrawer>
                <Content></Content>
            </Box>
        </ThemeProvider>
)
}

export { Dashboard }