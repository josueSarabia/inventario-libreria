import * as React from 'react';
import Box from '@mui/material/Box';
/* import Divider from '@mui/material/Divider'; */
import Drawer from '@mui/material/Drawer';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import Toolbar from '@mui/material/Toolbar';
import { ItemsList } from './ItemsList'



const drawerWidth = 240;

function ResponsiveDrawer({window, mobileOpen, handleDrawerToggle}) {
  const items = [
    {text: 'Agregar libro', icon: <AddIcon/>, route: '/add-book'}, 
    {text: 'Inventario', icon: <BookIcon/>, route: '/'},
    {text: 'Prestamos', icon: <BookIcon/>, route: 'loans'},
  ]
  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <ItemsList items={items}></ItemsList>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* MOBILE */}
      <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          PaperProps={{
            sx: {
              backgroundColor: "#e3f2fd"
            }
          }}
        >
          {drawer}
      </Drawer>
      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#e3f2fd"
          }
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export { ResponsiveDrawer }
