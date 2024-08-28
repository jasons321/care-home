import { useState, useEffect, useRef } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import sound from './assets/alert-sound-87478.mp3'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import IconButton from '@mui/material/IconButton';



export default function ExampleCounter({warningMessages, index, setWarnings, allMessages}) {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMuted = () => {
        setIsMuted(prevState => !prevState);
    }

    const closeBox = () => {
        const updatedMessages = allMessages.filter((_, i) => i !== index);
        setWarnings(updatedMessages);
    }


    const callAlert = () => {
        if (!isMuted) { 
            new Audio(sound).play();
        }

    }

    useEffect(() => {
        // Call the fetchDataOnLoad function when component mounts#
        callAlert();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <Box sx={{marginBottom:'20px'}}>
            <Alert severity="error" sx={{position:"relative"}}>
                <audio src={sound} />
                <AlertTitle sx={{position:"relative"}}>Error</AlertTitle>
                {warningMessages}
                <Button
                onClick={() => {
                    closeBox();
                }}
                >
                Click me
                </Button>
                <IconButton 
                    isMuted={isMuted}
                    onClick={() => {
                        toggleMuted();
                    }}
                    aria-label="delete" 
                    size="medium" 
                    sx={{position:"absolute", top:0, right: 0, border:0}}>
                        {isMuted ? <MusicOffIcon fontSize="medium"/> : < MusicNoteIcon fontSize="medium"/>}
                </IconButton>
            </Alert>
        </Box>
    );
}