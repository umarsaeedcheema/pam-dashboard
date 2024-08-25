"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { processSalesByAgent } from '@/utils/salesByAgentUtil'; 

export default function SalesByAgent({ callsData }: { callsData: any[] }) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (callsData.length) {
      const formattedData = processSalesByAgent(callsData);
      setChartData(formattedData);
    }
  }, [callsData]);

  

  return (
    <Box sx={{marginTop: '15px', p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>
        Sales by Agent (AI vs Human)
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" /> 
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#AAA" /> 
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
