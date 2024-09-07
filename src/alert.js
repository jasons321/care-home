import { useState, useEffect, useRef } from 'react';
import  AlertBox from './alertBox';
import Box from '@mui/material/Box';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import IconButton from '@mui/material/IconButton';
import sound from './assets/alert-sound-87478.mp3'
import Typography from '@mui/material/Typography';
import { borders } from '@mui/system';


export default function ExampleCounter({warningMessages, warningRef, setWarnings}) {
  const [isMuted, setIsMuted] = useState(true);
  let mutedRef = useRef(true);
  const toggleMuted = () => {

    setIsMuted(!mutedRef.current);
    mutedRef.current =  !mutedRef.current;
  }

  const callAlert = () => {
    if (!mutedRef.current) { 
        new Audio(sound).play();
    }
  }
  useEffect(() => {
    callAlert();

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (warningMessages.length != 0) {
        callAlert();
      }
      // You can replace the above line with any function or code you want to run every 5 seconds.
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [warningMessages]);

  return (
    
    <Box sx={{bgcolor:"#ffffff", 
              maxHeight: "300px", 
              overflowY:"scroll", 
              padding: "20px",  
              mt:"1.5rem", 
              mb:"1.5rem",
              borderRadius: '16px',  
              border: 1,
              borderColor: 'grey.200',
              boxShadow: 3,
              boxSizing:"border-box"}}>
          <audio src={sound} />
          <Typography sx={{mb:"200px", display:"inline", marginBottom:"200px"}} variant="h5"  component="div">
            Warnings
            <IconButton 
              isMuted={isMuted}
              onClick={() => {
                  toggleMuted();
              }}
              aria-label="delete" 
              size="medium" >
                  {isMuted ? <MusicOffIcon fontSize="medium"/> : < MusicNoteIcon fontSize="medium"/>}
            </IconButton>
          </Typography>
        {warningMessages.map((message, index) => (
            <AlertBox warningMessages={message} index={index} setWarnings={setWarnings} allMessages={warningMessages} warningRef={warningRef}/>
        ))}
    </Box>

  );
}