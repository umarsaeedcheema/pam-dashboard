"use client";
import * as React from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateTasksCompleted, calculateNewLeads, calculateFeedbackSatisfied, processDataForCallsPerDay, processDataForFeedback } from '@/utils/dashboardCardUtils';

export default function DashboardCards() {
  const [cardData, setCardData] = useState([
    { title: 'Calls per day', value: 'Loading...', description: 'Total Calls', data: [], chartType: 'line' },
    { title: 'Tasks', value: 'Loading...', description: 'Completed', data: [], chartType: 'circular' },
    { title: 'New Leads', value: 'Loading...', description: 'New Leads', data: [], chartType: 'bar' },
    { title: 'Feedback', value: 'Loading...', description: 'Satisfied', data: [], chartType: 'pie' },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const callsResponse = await fetch('/api/get-data?table=Calls');
        const calls = await callsResponse.json();

        const tasksCompleted = calculateTasksCompleted(calls.data);
        const newLeads = calculateNewLeads(calls.data);
        const feedbackSatisfied = calculateFeedbackSatisfied(calls.data);

        const callsPerDayData = processDataForCallsPerDay(calls.data);
        const feedbackData = processDataForFeedback(calls.data);

        setCardData([
          { title: 'Calls per day', value: `${calls.data.length}`, description: 'Total Calls', data: callsPerDayData, chartType: 'line' },
          { title: 'Tasks', value: `${tasksCompleted}%`, description: 'Completed', data: tasksCompleted, chartType: 'circular' },
          { title: 'New Leads', value: `${newLeads}`, description: 'New Leads', data: [{ name: 'New Leads', value: newLeads }], chartType: 'bar' },
          { title: 'Feedback', value: `${feedbackSatisfied}%`, description: 'Satisfied', data: feedbackData, chartType: 'pie' },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">{card.title}</Typography>
              {renderChart(card)}
              <Typography variant="h4" sx={{ marginTop: 2 }}>{card.value}</Typography>
              <Typography variant="body2">{card.description}</Typography>
            </CardContent>
          </Card>

        </Grid>
      ))}
    </Grid>
  );
}

function renderChart(card: any) {
  switch (card.chartType) {
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={card.data}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      );
    case 'circular':
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height={100}>
          <CircularProgress variant="determinate" value={card.data} size={60} />
        </Box>
      );
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={card.data}>
            <Bar dataKey="value" fill="#82ca9d" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      );
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie data={card.data} dataKey="value" nameKey="type" outerRadius={50} fill="#8884d8">
              {card.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
}
