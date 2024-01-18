import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const YourComponent = (address) => {
  const [dataSetFrom, setDataPointsFrom] = useState([]);
  const [dataSetTo, setDataPointsTo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageSize = 100;
        const pageNum = 1;
        const address = '2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR';

        const apiUrl = `/list?pageSize=${pageSize}&pageNum=${pageNum}&address=${address}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log("response");
        console.log(responseData)

        // Filter data to include only transactions where the specified address is in the "from" field
        const filteredDataFrom = responseData.data.list.filter(
          (item) => item.from === address
        );

        // Filter data to include only transactions where the specified address is in the "to" field
        const filteredDataTo = responseData.data.list.filter(
          (item) => item.to === address
        );

        // Group filtered data by date and calculate total amount for each date for "from" transactions
        const groupedDataFrom = filteredDataFrom.reduce((acc, item) => {
          const date = new Date(item.time).toISOString().split('T')[0];

          if (!acc[date]) {
            acc[date] = 0;
          }

          acc[date] += parseFloat(item.amount);
          return acc;
        }, {});

        // Group filtered data by date and calculate total amount for each date for "to" transactions
        const groupedDataTo = filteredDataTo.reduce((acc, item) => {
          const date = new Date(item.time).toISOString().split('T')[0];

          if (!acc[date]) {
            acc[date] = 0;
          }

          acc[date] += parseFloat(item.amount);
          return acc;
        }, {});

        // Format data into dataPoints array for "from" transactions
        const formattedDataPointsFrom = Object.keys(groupedDataFrom).map(
          (date) => ({
            x: new Date(date),
            y: groupedDataFrom[date],
          })
        );

        // Format data into dataPoints array for "to" transactions
        const formattedDataPointsTo = Object.keys(groupedDataTo).map((date) => ({
          x: new Date(date),
          y: groupedDataTo[date],
        }));

        setDataPointsFrom(formattedDataPointsFrom);
        setDataPointsTo(formattedDataPointsTo);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Run the effect only once on component mount

  const optionsFrom = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: 'Tokens issued',
    },
    axisY: {
      title: 'Tokens (Elf)',
      suffix: '',
    },
    axisX: {
      title: 'Date',
      prefix: '',
      interval: 0,
    },
    width: 700, // Set the width of the chart
    height: 500, // Set the height of the chart
    data: [
      {
        type: 'line',
        showInLegend: true,
        name: 'Tokens Issued',
        toolTipContent: 'Date: {x}, Tokens: {y}',
        dataPoints: dataSetFrom,
      },
    ],
  };
  
  const optionsTo = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: 'Tokens Redeemed',
    },
    axisY: {
      title: 'Tokens (Elf)',
      suffix: '',
    },
    axisX: {
      title: 'Date',
      prefix: '',
      interval: 0,
    },
    width: 700, // Set the width of the chart
    height: 500, // Set the height of the chart
    data: [
      {
        type: 'line',
        showInLegend: true,
        name: 'Tokens Redeemed',
        toolTipContent: 'Date: {x}, Tokens: {y}',
        dataPoints: dataSetTo,
      },
    ],
  };
  
  return (
    <div className="container">
    <div className="chart-container">
      <div className="chart">
        <CanvasJSChart options={optionsFrom} />
        <h3  style={{ marginBottom: '40px' }}>
          Note: The more the number of tokens issued per day, the more the customers have been spending and participating in the loyalty program.
        </h3>
      </div>
      <div className="chart">
        <CanvasJSChart options={optionsTo} />
        <h3  style={{ marginBottom: '0px' }}>
          Note: This Chart tracks the tokens redeemed per day. The more the number of tokens redeemed per day, the more the customers have been spending their tokens at the merchant's shop.
        </h3>
      </div>
    </div>
    </div>
  );

};

export default YourComponent;
