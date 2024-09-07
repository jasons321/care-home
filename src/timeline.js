import * as React from 'react';
import {useEffect, useState} from 'react';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import { Typography, Box } from '@mui/material';


function sortDates(dateArray) {
  // Use sort method with a comparator function
  dateArray.sort((a, b) => {
    // Convert strings to Date objects for comparison
    const dateA = new Date(a);
    const dateB = new Date(b);

    // Compare dates
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });

  return dateArray;
}

const getAllDates = (activities) => {
  var dates = [];
  activities.forEach((element) => {
    if (element.type == "Room") {
      var timeline = element.activities;
      var newDates = [];
      timeline.forEach((object) => {
        newDates.push(object.date);
      });
      dates = dates.concat(newDates);
    }
  });
  return sortDates([...new Set(dates)]);
};


const getSorted = (dates, passedActivities) => {
  var sorted = [];
  var count = 1;
  dates.forEach((element) => {
    passedActivities.forEach((activities) => {
      if (activities.type == "Room") {
        var timeline = activities.activities
        timeline.forEach((object) => {
          if (object.date === element) { 
            sorted.push({"id":count, "room": activities.name, "date": element, "time":object.time, "activities":object.activities});
            count++;
          }
        });
      }
    });
  });
  sorted.sort((a, b) => {
    // Compare dates first
    let dateComparison = a.date.localeCompare(b.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
  
    // If dates are the same, compare times
    return a.time.localeCompare(b.time);
  });
  return sorted;
};

export default function CustomizedTimeline({activities, date, parsed}) {
  const [sortedTimeline, setTimeline] = useState([]);
  const [allDates, setDates] = useState(getAllDates(activities));
  useEffect(() => {
    parsed(sortedTimeline);
  }, [sortedTimeline]);


  useEffect(() => {
    let newDates = getAllDates(activities);
    setDates(getAllDates(activities));

    if (date[0] != 'set') {
      var newSortedDates = [];
      newDates.forEach((element) => {
        var currentDate = new Date(element);
        var startDate = new Date(date[0].startDate);
        var endDate = new Date(date[0].endDate);

        currentDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        if (currentDate >= startDate && currentDate <= endDate) {
          newSortedDates.push(element);
        }
      });
      setDates(sortDates(newSortedDates));
      setTimeline(getSorted(newSortedDates, activities));
    }
    else {
      setDates(sortDates(newDates));
      setTimeline(getSorted(newDates, activities));
    }
    
  }, [date, activities]); // Only re-run the effect if props.someProp changes

  return (
    <Timeline sx={{pl:'50px', pr:'50px', maxHeight: "300px", overflowY:"scroll"}}>
      {allDates.map(function(data, index) {
          return (
            <Box key={index}>
            <Divider>{data}</Divider>
            {sortedTimeline.map(function(timeline, index) {
              if (timeline.date === data) { 
                return (
                  <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0', flex:"0.1",  borderRadius: '10px' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {timeline.time}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{boxShadow: 1, m:"1rem", py: '12px', px: 2, display: "flex", alignItems:"center", gap: "2rem", border:"0.5px solid lightgray",bgcolor: "white" }}>
                      <Chip color="primary" label={timeline.room} />
                    <Typography display="inline"> {timeline.activities}</Typography>
                  </TimelineContent>
                </TimelineItem>
                  )
              }
                
            })}
            </Box>
          )
      })}
      
    </Timeline>
  );
}