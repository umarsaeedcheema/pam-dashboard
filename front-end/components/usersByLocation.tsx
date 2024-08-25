
"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { processUsersByLocation } from '@/utils/usersByLocationUtil';

export default function UsersByLocation({ callersData }) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (callersData.length) {
      const formattedData = processUsersByLocation(callersData);
      setChartData(formattedData);
    }
  }, [callersData]);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>
        Users by Location
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#FFA500" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
