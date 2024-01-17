import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';


const YourComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageSize = 10; // Set your desired page size
        const pageNum = 1; // Set your desired page number
        const address = '2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR'; // Replace with the actual address

        const apiUrl = `/list?pageSize=${pageSize}&pageNum=${pageNum}&address=${address}`;

        const response = await fetch(apiUrl); //json data

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Run the effect only once on component mount

  // const transactions = data.data.list;
  // console.log(data.data.list);

  // const parseDate = (isoDate) => {
  //   const date = new Date(isoDate);
  //   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  // };

  // const tokensPerDay = transactions.reduce((acc, transaction) => {
  //   const date = parseDate(transaction.time);
  //   const amount = parseFloat(transaction.amount);
  
  //   if (!acc[date]) {
  //     acc[date] = {
  //       issued: 0,
  //       received: 0,
  //       transactionsCount: 0
  //     };
  //   }
  
  //   if (transaction.action === 'Transferred') {
  //     acc[date].issued += amount;
  //   } else if (transaction.action === 'Received') {
  //     acc[date].received += amount;
  //   }
  //   acc[date].transactionsCount += 1;
  
  //   return acc;
  // }, {});

  // console.log(tokensPerDay);

  // const [chart, setChart] = useState(null);
  
  // // Destroy chart on unmount
  // useEffect(() => {
  //   return () => {
  //     if (chart) {
  //       chart.destroy();
  //     }
  //   };
  // }, [chart]);

  // // useEffect to create chart
  // useEffect(() => {
  //   if (data) {
  //     const ctx = document.getElementById('myChart').getContext('2d');
  //     const chartInstance = new Chart(ctx, {
  //       type: 'bar',
  //       data: {
  //         labels: Object.keys(tokensPerDay),
  //         datasets: [{
  //           label: 'Tokens Issued',
  //           data: Object.values(tokensPerDay).map(day => day.issued),
  //           backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //           borderColor: 'rgba(255, 99, 132, 1)',
  //           borderWidth: 1
  //         },
  //         {
  //           label: 'Tokens Received',
  //           data: Object.values(tokensPerDay).map(day => day.received),
  //           backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //           borderColor: 'rgba(54, 162, 235, 1)',
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         scales: {
  //           y: {
  //             beginAtZero: true
  //           }
  //         }
  //       }
  //     });

  //     setChart(chartInstance);
  //   }
  // }, [data]); // Rerun effect when data changes


  return (
    <div>
      {data && (
        <div>
          {/* Render your data here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default YourComponent;