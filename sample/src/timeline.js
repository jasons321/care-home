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
    var timeline = element.activities;
    var newDates = [];
    timeline.forEach((object) => {
      newDates.push(object.date);
    });
    dates = dates.concat(newDates);
  });

  return sortDates([...new Set(dates)]);
};


const getSorted = (dates, passedActivities) => {
  var sorted = [];
  var count = 1;
  dates.forEach((element) => {
    passedActivities.forEach((activities) => {
      var timeline = activities.activities
      timeline.forEach((object) => {
        if (object.date === element) { 
          sorted.push({"id":count, "room": activities.name, "date": element, "time":object.time, "activities":object.activities});
          count++;
        }
      });
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
  const totalDates = getAllDates(activities);
  const [sortedTimeline, setTimeline] = useState([]);
  const [allDates, setDates] = useState(getAllDates(activities));
  useEffect(() => {
    setTimeline(getSorted(allDates, activities));
    parsed(sortedTimeline);
    // Perform actions based on prop changes
  }, [activities]); // Only re-run the effect if props.someProp changes

  useEffect(() => {
    setDates(getAllDates(activities));
    if (date[0] != 'set') {
      var newSortedDates = [];
      totalDates.forEach((element) => {
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
      parsed(sortedTimeline);
    }
  }, [date]); // Only re-run the effect if props.someProp changes
  return (
    <Timeline sx={{bgcolor:"#f6f7f7"}}>
      {allDates.map(function(data) {
          return (
            <Box>
            <Divider>{data}</Divider>
            {sortedTimeline.map(function(timeline) {
              if (timeline.date === data) { 
                return (
                  
                  <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0', flex:"0.1" }}
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