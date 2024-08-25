"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCards from '@/components/dashboard';

export default function Dashboard() {
  const [callsData, setCallsData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [callersData, setCallersData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const callsResponse = await fetch('/api/get-data?table=Calls');
      const calls = await callsResponse.json();

      const agentsResponse = await fetch('/api/get-data?table=Agents');
      const agents = await agentsResponse.json();

      const callersResponse = await fetch('/api/get-data?table=Callers');
      const callers = await callersResponse.json();

      setCallsData(calls.data);
      setAgentsData(agents.data);
      setCallersData(callers.data);
    }

    fetchData();
  }, []);

  // Example charts based on the data structure
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <DashboardCards />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Call Topics Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={callsData}
                dataKey="Length" // or other key depending on your data
                nameKey="Topic"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {callsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Agent Performance</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentsData}>
              <XAxis dataKey="AgentID" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Performance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Call Outcomes</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={callsData}>
              <XAxis dataKey="Outcome" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Length" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
