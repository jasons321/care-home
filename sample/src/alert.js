import { useState, useEffect, useRef } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import sound from './assets/alert-sound-87478.mp3'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import IconButton from '@mui/material/IconButton';



export default function ExampleCounter() {
    const [isVisible, setIsVisible] = useState(false);
    const [played, setIsPlayed] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMuted = () => {
        setIsMuted(prevState => !prevState);
    }

    const setAlert = () => {
        setIsVisible(false);
    }
    const changeAlert = () => {
        setIsVisible(true);
        callAlert();
    }
    const callAlert = () => {
        if (!isMuted) { 
            new Audio(sound).play()

        }

    }
    
    useEffect(() => {
        // Call the fetchDataOnLoad function when component mounts#
        callAlert();
    }, []); // Empty dependency array ensures the effect runs only once on mount

  return (


    <Box >
        {!isVisible && (
            <Alert severity="info" sx={{position:"relative"}}>
            <AlertTitle>Info</AlertTitle>
                No event at the moment.
                <Button
                    onClick={() => {

                        changeAlert();
                    }}
                    >
                    create alert
                </Button>
                <IconButton 
                isMuted={isMuted}
                onClick={() => {
                    toggleMuted();
                }}
                aria-label="delete" 
                size="medium" 
                sx={{position:"absolute", top:0, right: 0, border:0}}>
                    {isMuted ?  <MusicOffIcon fontSize="medium"/> : < MusicNoteIcon fontSize="medium"/> }
                </IconButton>
            </Alert>
        )}
        {isVisible && (
        <Alert severity="error" sx={{position:"relative"}}>
            <audio src={sound} />
            <AlertTitle sx={{position:"relative"}}>Error</AlertTitle>
            This is an error Alert with a scary title.
            <Button
            onClick={() => {
                setAlert();
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
        )}
    </Box>
  );
}