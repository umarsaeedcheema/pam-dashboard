
"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { processUsersByLanguage } from '@/utils/usersByLanguageUtil'; 

export default function UsersByLanguage({ callersData }: { callersData: any[] }) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (callersData.length) {
      const formattedData = processUsersByLanguage(callersData);
      setChartData(formattedData);
    }
  }, [callersData]);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>
        Users by Language
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
