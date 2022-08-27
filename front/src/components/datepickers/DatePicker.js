import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function DatePicker({label, date, handleChange}) {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={(value) => handleChange(value)}
          renderInput={(params) => <TextField {...params} />}
          /* onClose={(value) => handleChange(value)} */
          InputProps={
            {
                sx: {background: '#fff'},
            }
          }
        />
      </Stack>
    </LocalizationProvider>
  );
}


export {DatePicker}