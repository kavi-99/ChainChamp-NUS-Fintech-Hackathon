import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './rank.css';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const YourComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [rankings, setRankings] = useState([]);

  // Mock data for brands [in reality this could some from a database of brands that are working with us]
  // Starbucks - JueLin wallet
  // Nike - Anni wallet
  // Adidas - Chanric wallet
  // New Balance - Kavi Wallet
  // Reebok - Cheryl wallet
  const brandsAddress = [
    { name: 'Starbucks', walletaddr: '2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR' },
    { name: 'Nike', walletaddr: 'J3fNf2mHedV4YgG739qf74VF9NDthZRsmsnLknRspbPxzkZQR' },
    { name: 'Adidas', walletaddr: '2XjBPiQCFocGWr7yyGggk1izdhFPcYYhd1brFFQwVfR9P2wfR' },
    { name: 'New Balance', walletaddr: '2Hztgoeh6GmsnaRZr99w5Qc7ayzXbhfticytNS1GqeKT7Cy23G' },
    { name: 'Reebok', walletaddr: '2Hztgoeh6GmsnaRZr99w5Qc7ayzXbhfticytNS1GqeKT7Cy23G' }
  ];

  useEffect(() => {
    const fetchData = async (address) => {
      try {
        const pageSize = 100;
        const pageNum = 1;

        const apiUrl = `/list?pageSize=${pageSize}&pageNum=${pageNum}&address=${address}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log("response");
        console.log(responseData);

        // Filter data to include only transactions where the specified address is in the "from" field
        const filteredDataFrom = responseData.data.list.filter(
          (item) => item.from === address
        );

        // Count the number of entries in the filteredDataFrom
        const transactionCount = filteredDataFrom.length;

        return transactionCount;
      } catch (error) {
        setError(error.message);
        return 0;
      }
    };

    const fetchAllData = async () => {
        try {
          const rankingsPromises = brandsAddress.map(async (brand) => {
            const transactionCount = await fetchData(brand.walletaddr);
            return { name: brand.name, transactionCount };
          });
      
          const rankingsData = await Promise.all(rankingsPromises);
      
          // Sort the rankings in descending order based on transaction count
          const sortedRankings = rankingsData.sort((a, b) => b.transactionCount - a.transactionCount);
          setRankings(sortedRankings);
      
          // Add a special class to the top 3 rows
          const topThreeRows = document.querySelectorAll('.ranking-table tbody tr');
          topThreeRows.forEach((row, index) => {
            if (index < 3) {
              row.classList.add('top-three');
            }
          });
        } catch (error) {
          setError(error.message);
        }
      };

    fetchAllData();
  }, []);

  return (
    <div className="ranking-table-container">
      
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>No. of transactions</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((brand, index) => (
            <tr key={index}>
              <td>{index + 1}st</td>
              <td>{brand.name}</td>
              <td>{brand.transactionCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
