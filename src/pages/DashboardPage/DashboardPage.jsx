import { Paper } from '@mui/material'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './DashboardPage.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        borderColor: 'rgb(255, 99, 132)',
        data: [10, 20, 30, 20, 10, 70, 120],
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        borderColor: 'rgb(53, 162, 235)',
        data: [30, 10, 70, 90, 20, 10, 50],
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <div>
      <Paper elevation={2} className='px-3 py-2'>
        <h1>This is Dashboard Page</h1>
        <div className={styles.wrapperChart}>
          <Line options={options} data={data} />;
        </div>
      </Paper>
      <Paper elevation={2} className='mt-4 px-3 py-2'>
        <h1>This is Dashboard Page</h1>
      </Paper>
    </div>
  )
}
