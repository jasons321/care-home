import * as React from 'react';
import Ticker from 'react-ticker'
import { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Divider from '@mui/material/Divider';



export default function TickerFeed({activityTicker}) {
    let prevActivity = useRef(activityTicker);
    const GetRatesFromAPI = () => {
        const [rates, setRates] = useState("");
        useEffect(() => {
            if (prevActivity.current == activityTicker) { 
                setRates("")
            }
            else {
                setRates(activityTicker)
            }
            prevActivity.current = activityTicker;
        }, []);

        // A placeholder is needed, to tell react-ticker, that width and height might have changed
        // It uses MutationObserver internally
        return rates ? (
            <Typography style={{width:"300px", overflowX:"hidden" }}>{rates}               </Typography>
        ) : (
            <p style={{ visibility: "hidden" }}>Placeholder</p>
        );
        };
        
  return (
    <Stack
        direction="row"
        spacing={2}
        maxHeight="80px"
        alignItems="center"
        backgroundColor="#ffffff"
        
        sx={{pl:'20px', 
            pr:'20px',
            pt:'10px',
            pb:'10px',
            borderRadius:'16px',                
            border: 1,
            borderColor: 'grey.200',
            boxShadow: 1,  
            boxShadow: 3,   
            mt:"1.5rem", 
            mb:"1.5rem"
        }}
    >
        <Box
                display="flex" 
                flexDirection="row"
                alignItems={"center"}
                backgroundColor="#1976d2" 
                gap="10px"
                color="white"
                padding="10px"
                alignSelf={'stretch'}
                borderRadius={'16px'}
        >
            <AnnouncementIcon/>
            <Typography >Incoming Activity</Typography>
        </Box>
        <Box flex="1" paddingTop="30px">
            <Ticker  offset="run-in" speed="20">
                {() => 
                    <GetRatesFromAPI/>
                }
            </Ticker>
        </Box>

    </Stack>
  );
}