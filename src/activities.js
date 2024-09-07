
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';import ListIcon from '@mui/icons-material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AlertDialogSlide from './date';
import ResponsiveDialog from './print';
import CustomizedTimeline from './timeline';

export default function Activities({isMobile, parsedActivities, totalActivities, setParsed, selectedActivities}) {
    const [alignment, setAlignment] = React.useState(null);

    const handleToggle = (event, newAlignment) => {
        if (newAlignment !== null) {
          setAlignment(newAlignment);
        }
      };
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    
    const [dateRange, setParentDates] = useState(['set', 'set']);

  return (
    <Box>
        <Box component="section" sx={{ display: 'flex',  justifyContent: 'space-between' }}>
        <Typography variant="h4" >
        Activity Log
        </Typography>
        {isMobile ?
        <div>
        <Button
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        startIcon={ <ListIcon/> }
        >
        Options
        </Button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        >
        <MenuItem ><AlertDialogSlide setParentDates={setParentDates}/></MenuItem>
        <MenuItem ><ResponsiveDialog fullWidth parsed={parsedActivities}/> </MenuItem>
        <MenuItem >              
            <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            fullWidth
            onChange={handleToggle}
            aria-label="Platform"
            >
            <ToggleButton value="General">General</ToggleButton>
            <ToggleButton value="Rooms">Rooms</ToggleButton>
            </ToggleButtonGroup>
        </MenuItem>
        <MenuItem>
            <Button fullWidth  variant="contained" disableElevation>
            Reset
            </Button>
        </MenuItem>
        </Menu>
        </div>  
        : <Box sx={{ display: 'flex', gap:"0.5rem", width:"fit-content"}} >
        <AlertDialogSlide setParentDates={setParentDates}/>
        <ResponsiveDialog parsed={parsedActivities}/>
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleToggle}
            aria-label="Platform"
        >
            <ToggleButton value="General">General</ToggleButton>
            <ToggleButton value="Rooms">Rooms</ToggleButton>
        </ToggleButtonGroup>
        <Button variant="contained" disableElevation>
            Reset
        </Button>
        </Box>}
        </Box>
        {alignment === 'General' ? <CustomizedTimeline activities={totalActivities} date={dateRange} parsed={setParsed}/> : <CustomizedTimeline activities={selectedActivities} date={dateRange} parsed={setParsed}/>}


    </Box>
  );
}