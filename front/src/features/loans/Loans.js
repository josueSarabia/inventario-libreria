import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from './TabPanel'
import {AddLoanForm} from './AddLoanForm'
import {ReturnBookForm} from './ReturnBookForm'

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



function Loans() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Realiar prestamo" {...a11yProps(0)} />
                    <Tab label="Realizar devolucion" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AddLoanForm></AddLoanForm>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReturnBookForm></ReturnBookForm>
            </TabPanel>
        </Box>
    )
}

export {Loans}