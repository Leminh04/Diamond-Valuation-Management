import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function EarningChart() {
  const theme = useTheme();

  // Initialize the data state with the original time values and initial amounts
  const initialData = [
    { time: '00:00', amount: 0 },
    { time: '03:00', amount: 0 },
    { time: '06:00', amount: 0 },
    { time: '09:00', amount: 0 },
    { time: '12:00', amount: 0 },
    { time: '15:00', amount: 0 },
    { time: '18:00', amount: 0 },
    { time: '21:00', amount: 0 },
    { time: '24:00', amount: 0 },
  ];

  const [data, setData] = React.useState(initialData);
  const [transactions, setTransactions] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/transactions');
      const transactions = response.data;

      const updatedData = initialData.map((slot) => ({
        ...slot,
        amount: transactions
          .filter(transaction => transaction.time === slot.time)
          .reduce((acc, transaction) => acc + transaction.amount, 0),
      }));

      setData(updatedData);
      setTransactions(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleFetchData = () => {
    fetchTransactions();
  };

  // Effect to fetch transactions initially and set interval to update data every 5 seconds
  React.useEffect(() => {
    // Fetch transactions initially
    fetchTransactions();

    // Set up an interval to fetch transactions every 5 seconds
    const interval = setInterval(() => {
      const now = new Date();
      // Check if day has changed
      if (now.getDate() !== currentDate.getDate()) {
        // Reset data for a new day
        setData(initialData);
        setCurrentDate(now);
      }
      fetchTransactions();
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentDate]); // Only re-run effect if currentDate changes

  // Get current date and format day/month
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Box sx={{ width: 'calc(70% - 16px)', marginRight: '16px' }}>
        <Typography variant="h6" style={{ top: 16, left: 16 }}>
          Day: {formattedDate}
        </Typography>
        <LineChart
          dataset={data}
          margin={{
            top: 40,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 3000,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
          height={300} // Set the height explicitly for the chart
        />
      </Box>
      <Box sx={{ width: '30%' }}>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
          {transactions.length === 0 ? (
            <ListItem>
              <ListItemText primary="No transactions" />
            </ListItem>
          ) : (
            transactions.map((transaction, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Amount: $${transaction.amount}`}
                  secondary={`Time: ${transaction.time}, Customer: ${transaction.customerName}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
}
