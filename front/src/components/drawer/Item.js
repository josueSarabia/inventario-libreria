import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";

function Item({ text, icon, route }) {
    let navigate = useNavigate();

    return (
        <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate(route)}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
}

export { Item }