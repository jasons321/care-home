import { useState, useEffect, useRef } from 'react';
import  AlertBox from './alertBox';
import Box from '@mui/material/Box';


export default function ExampleCounter({warningMessages, setWarnings}) {
    console.log(warningMessages)
  return (
    <Box>
        {warningMessages.map((message, index) => (
            <AlertBox warningMessages={message} index={index} setWarnings={setWarnings} allMessages={warningMessages}/>
        ))}
    </Box>

  );
}