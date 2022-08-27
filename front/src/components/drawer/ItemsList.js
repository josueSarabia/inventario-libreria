import * as React from 'react';
import List from '@mui/material/List';
import { Item } from './Item'

function ItemsList({ items }) {

    return (
        <List>
            {items.map((item, index) => (
                <Item text={item.text} key={index} route={item.route} icon={item.icon} ></Item>
            ))}
        </List>
    )
}

export { ItemsList }