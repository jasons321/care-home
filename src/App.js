

import * as React from 'react';
import './App.css';
import activities from './assets/activities.json';
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

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);
  console.log(isMobile)
  const totalActivities = activities.rooms
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


  const handleChange = (event) => {
    totalActivities.forEach(function(room, index) {
      if (room.name == event.target.name && event.target.checked == false) { 
        filterActivities(selectedActivities.filter(item => item.name !== room.name))
      }
      if (room.name == event.target.name && event.target.checked == true) { 
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
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Main Dashboard
          </Typography>
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
        <List>
          <ListItem className='room-heading' sx={{display:"flex", gap:"0.5rem"}}>
            <HomeIcon fontSize='large'/>
            <h1>Rooms</h1>
          </ListItem>
          {totalActivities.map(function(data) {
          return (
            <ListItem disablePadding>
                <Checkbox name={data.name} defaultChecked onChange={handleChange}/>
                <ListItemText primary={data.name} />
            </ListItem>
            )
          })}
        </List>
        <Divider />
        <List>
          {['Select All', 'Select None'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <DoneAllIcon /> : <RemoveDoneIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography sx={{mb:"1rem"}} variant="h4" noWrap component="div">
          Update
        </Typography>
        <ExampleCounter/>
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