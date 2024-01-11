import React, { useEffect, useState } from 'react';

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