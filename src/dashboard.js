

import * as React from 'react';
import './App.css';
import activities from './assets/activities.json';
//import logo from './assets/IMG_4704.PNG';
//import logo from './assets/IMG_4686.jpeg';
import logo from './assets/logo.png';
import { useState, useEffect, useRef } from 'react';

import CustomizedTimeline from './timeline';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListIcon from '@mui/icons-material/List';

import ExampleCounter from './alert';
import AlertDialogSlide from './date';
import ResponsiveDialog from './print';
import io from 'socket.io-client';


// client-side
const socket = io("http://ec2-51-20-2-26.eu-north-1.compute.amazonaws.com:5000");
socket.on('data_update', (data) => {
    console.log("sdf");
    console.log(data);
    // Handle the real-time data here
});

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
  

export default function App() {
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down('sm')); // or 'xs'
  const [isMobile, setIsMobile] = useState(false);

  const targetRef = useRef(null);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const totalActivities = activities.rooms

  let checkedRooms = {};
  totalActivities.forEach((activity) => { 
    checkedRooms[activity.name] = true;
  })

  const [checked, setChecked] = useState(checkedRooms);

  const [alignment, setAlignment] = React.useState(null);

  const [selectedActivities, filterActivities] = useState(activities.rooms);

  const [open, setOpen] = React.useState(false);
  
  const [dateRange, setParentDates] = useState(['set', 'set']);
  
  const [parsedActivities, setParsed] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function selectAll(){
    // Create a new object with all values set to true
    const updatedObject = {};
    for (let key in checked) {
      if (checked.hasOwnProperty(key)) {
        updatedObject[key] = true;
      }
    }
    filterActivities(totalActivities);
    setChecked(updatedObject);
  }

  function selectNone(){
    // Create a new object with all values set to true
    const updatedObject = {};
    for (let key in checked) {
      if (checked.hasOwnProperty(key)) {
        updatedObject[key] = false;
      }
    }
    filterActivities([]);
    setChecked(updatedObject);
  }
  
  const handleChange = (event) => {
    totalActivities.forEach(function(room, index) {
      if (room.name == event.target.name && event.target.checked == false) { 
        setChecked({
          ...checked,
          [event.target.name]: false,
        });
        filterActivities(selectedActivities.filter(item => item.name !== room.name))
      }
      if (room.name == event.target.name && event.target.checked == true) {
        setChecked({
          ...checked,
          [event.target.name]: true,
        });
        filterActivities([...selectedActivities, room]);
      }
    });
  };


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


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor: "#bbdefb"}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <img id="logo" src={logo}/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List ref={targetRef}>
          <ListItem className='room-heading' sx={{display:"flex", gap:"0.5rem"}}>
            <HomeIcon fontSize='large'/>
            <h2>Rooms</h2>
          </ListItem>
          {totalActivities.map(function(data) {
          return (
            <ListItem disablePadding>
                <Checkbox name={data.name} checked={checked[data.name]} onChange={handleChange}/>
                <ListItemText primary={data.name} />
            </ListItem>
            )
          })}
        </List>
        <Divider />
        <List>
            <ListItem key='Select All' disablePadding>
              <ListItemButton onClick={selectAll}>
                <ListItemIcon>
                  <DoneAllIcon />
                </ListItemIcon>
                <ListItemText primary='Select All'/>
              </ListItemButton>
            </ListItem>
            <ListItem key='Select None' disablePadding>
              <ListItemButton onClick={selectNone}>
                <ListItemIcon>
                  <RemoveDoneIcon/>
                </ListItemIcon>
                <ListItemText primary='Select None'/>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography sx={{mb:"1rem"}} variant="h4" noWrap component="div">
          Update
        </Typography>
        {Array.from({ length: 3 }, (_, i) => <ExampleCounter/>)}
        <Divider style={{width:'100%'}} sx={{mt:"1rem", mb:"1rem"}}/>
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
              startIcon={              <ListIcon/>              }
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
          {alignment === 'General' ? <CustomizedTimeline activities={totalActivities} date={dateRange} parsed={setParsed}/> : <CustomizedTimeline activities={selectedActivities} date={dateRange} parsed={setParsed}/>
        }

          </Main>
    </Box>
  );
}