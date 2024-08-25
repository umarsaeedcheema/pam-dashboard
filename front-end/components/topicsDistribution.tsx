import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Typography, Box } from '@mui/material';
import { processCallTopics } from '../utils/callTopics'; 

export default function CallTopicsDistribution({ callsData }) {
  const [chartData, setChartData] = useState<any>([]);

  const specificTopics = [
    'Routine maintenance',
    'Repair',
    'Oil Change',
    'Car wash',
    'Car sale',
  ];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  useEffect(() => {
    if (callsData.length) {
      const formattedData = processCallTopics(callsData, specificTopics);
      setChartData(formattedData);
    }
  }, [callsData]);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px', marginTop: '15px' }}>
      <Typography variant="h6" gutterBottom>
        Call Topics Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
