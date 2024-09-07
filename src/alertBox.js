import { useState, useEffect, useRef } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';




export default function ExampleCounter({warningMessages, index, setWarnings, allMessages, warningRef}) {
    const closeBox = () => {
        const updatedMessages = warningRef.current.filter((_, i) => i !== index);
        setWarnings(updatedMessages);
        warningRef.current = updatedMessages;
    }

    return (
        <Box sx={{marginBottom:'20px'}}>
            <Alert severity="error" sx={{position:"relative"}}>
                <AlertTitle sx={{position:"relative"}}>Warning</AlertTitle>
                {warningMessages}
                <Button
                onClick={() => {
                    closeBox();
                }}
                >
                Close
                </Button>
            </Alert>
        </Box>
    );
}