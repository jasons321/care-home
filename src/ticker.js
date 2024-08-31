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
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        height="auto"
        alignItems="center"
        backgroundColor="#e3f2fd"
    >

        <Box
                display="flex" 
                flexDirection="row" 
                gap="10px"
        >
            <AnnouncementIcon/>
            <Typography>Incoming Activity</Typography>
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