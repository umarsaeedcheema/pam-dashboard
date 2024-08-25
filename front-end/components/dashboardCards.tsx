"use client"
import * as React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useState } from 'react';



export default function DashboardCards() {
  const [cardData, setCardData] = useState([
    { title: 'Calls per day', value: 'Loading...', description: 'Response rate' },
    { title: 'Tasks', value: 'Loading...', description: 'Completed' },
    { title: 'New Leads', value: 'Loading...', description: '70% Daily Goal' },
    { title: 'Feedback', value: 'Loading...', description: 'Satisfied' },
  ]);

  React.useEffect(() => {
    async function fetchData() {
      const callsResponse = await fetch('/api/get-data?table=Calls');
      const calls = await callsResponse.json();

      const tasksCompleted = calculateTasksCompleted(calls.data); // Define this function as needed
      const newLeads = calculateNewLeads(calls.data); // Define this function as needed
      const feedbackSatisfied = calculateFeedbackSatisfied(calls.data); // Define this function as needed

      setCardData([
        { title: 'Calls per day', value: `${calls.data.length}`, description: 'Total Calls' },
        { title: 'Tasks', value: `${tasksCompleted}%`, description: 'Completed' },
        { title: 'New Leads', value: `${newLeads}`, description: 'New Leads' },
        { title: 'Feedback', value: `${feedbackSatisfied}%`, description: 'Satisfied' },
      ]);
    }

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h4">{card.value}</Typography>
              <Typography variant="body2">{card.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function calculateTasksCompleted(data) {
  // Example logic to calculate tasks completed percentage
  // Adjust this logic based on your specific data structure and requirements
  const completedTasks = data.filter(call => call.Accepted).length;
  return ((completedTasks / data.length) * 100).toFixed(2);
}

function calculateNewLeads(data) {
  // Example logic to calculate new leads
  // Adjust this logic based on your specific data structure and requirements
  return data.filter(call => call.Outcome === 'Led to sale').length;
}

function calculateFeedbackSatisfied(data) {
  // Example logic to calculate feedback satisfaction percentage
  // Adjust this logic based on your specific data structure and requirements
  const satisfiedFeedback = data.filter(call => call.Feedback === true).length;
  return ((satisfiedFeedback / data.length) * 100).toFixed(2);
}
