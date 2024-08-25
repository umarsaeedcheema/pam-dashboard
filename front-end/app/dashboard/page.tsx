"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DashboardCards from '@/components/dashboardCards';
import CallTopicsDistribution from '@/components/topicsDistribution';
import SalesByAgent from '@/components/salesByAgent';
import UsersByLocation from '@/components/usersByLocation';
import UsersByLanguage from '@/components/usersByLanguage';


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


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <DashboardCards />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CallTopicsDistribution callsData={callsData} />
        </Grid>


        <Grid item xs={12} md={6}>
          <SalesByAgent callsData={callsData} />
        </Grid>

        <Grid item xs={12} md={6}>
          <UsersByLocation callersData={callersData} />
        </Grid>

        <Grid item xs={12} md={6}>
          <UsersByLanguage callersData={callersData} />
        </Grid>
      </Grid>
    </Box>
  );
}
