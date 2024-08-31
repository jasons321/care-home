import { useState, useEffect, useRef } from 'react';
import  AlertBox from './alertBox';
import Box from '@mui/material/Box';


export default function ExampleCounter({warningMessages, warningRef, setWarnings}) {
  return (
    <Box sx={{bgcolor:"#f6f7f7", maxHeight: "300px", overflowY:"scroll"}}>
        {warningMessages.map((message, index) => (
            <AlertBox warningMessages={message} index={index} setWarnings={setWarnings} allMessages={warningMessages} warningRef={warningRef}/>
        ))}
    </Box>

  );
}