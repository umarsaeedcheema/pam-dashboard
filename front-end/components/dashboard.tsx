import * as React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function DashboardCards() {
  const cardData = [
    { title: 'Calls per day', value: '75%', description: 'Response rate' },
    { title: 'Tasks', value: '45%', description: 'Completed' },
    { title: 'New Leads', value: '33', description: '70% Daily Goal' },
    { title: 'Feedback', value: '75%', description: 'Satisfied' },
  ];

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
