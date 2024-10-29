import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Paper,
  Box
} from '@mui/material';
import {
  Folder as FolderIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateRandomData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Project ${i + 1}`,
    materials: Math.floor(Math.random() * 1000),
    workers: Math.floor(Math.random() * 50),
    progress: Math.floor(Math.random() * 100),
  }));
};

const DashboardCard = ({ title, value, icon: Icon }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="h2">
        {value}
      </Typography>
      <Icon color="primary" />
    </CardContent>
  </Card>
);

const DashboardRespMarchandise = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    setProjectData(generateRandomData(5));
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Overview',
      },
    },
  };

  const overviewChartData = {
    labels: projectData.map(project => project.name),
    datasets: [
      {
        label: 'Materials',
        data: projectData.map(project => project.materials),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Workers',
        data: projectData.map(project => project.workers),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const progressChartData = {
    labels: projectData.map(project => project.name),
    datasets: [
      {
        label: 'Progress (%)',
        data: projectData.map(project => project.progress),
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Merchandise Manager Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DashboardCard 
                title="Total Projects" 
                value={projectData.length} 
                icon={FolderIcon} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DashboardCard 
                title="Total Workers" 
                value={projectData.reduce((sum, project) => sum + project.workers, 0)} 
                icon={GroupIcon} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DashboardCard 
                title="Average Progress" 
                value={`${Math.round(projectData.reduce((sum, project) => sum + project.progress, 0) / projectData.length)}%`} 
                icon={TrendingUpIcon} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DashboardCard 
                title="Total Materials" 
                value={projectData.reduce((sum, project) => sum + project.materials, 0)} 
                icon={InventoryIcon} 
              />
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Project Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar options={chartOptions} data={overviewChartData} />
            </Box>
          </Paper>
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Project Progress
        </Typography>
        <Box sx={{ height: 300 }}>
          <Bar options={{...chartOptions, plugins: {...chartOptions.plugins, title: {display: true, text: 'Project Progress'}}}} data={progressChartData} />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardRespMarchandise;