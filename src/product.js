import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MemoPieChart = () => {
  const [memoData, setMemoData] = useState({
    labels: [],
    dataPoints: [],
  });

  const products = ['Coffee', 'Latte', 'Bread'];
  //The data is from explorer API, we added product name to the memo here to facilitate the proof of concept
  const list = [
    {
      "id": 1853023,
      "txId": "61b99172826719e2e60c07bcda181d26b77a990715b6eab7257e64c10a03f8f9",
      "from": "2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR",
      "to": "J3fNf2mHedV4YgG739qf74VF9NDthZRsmsnLknRspbPxzkZQR",
      "amount": "5.00000000",
      "symbol": "ELF",
      "action": "Transferred",
      "isCrossChain": "no",
      "relatedChainId": "AELF",
      "memo": 'Coffee',
      "txFee": {},
      "time": "2024-01-17T13:56:12.3291856Z",
      "method": "ManagerForwardCall",
      "blockHeight": 199443117,
      "addressFrom": "2AD1QG3U3dzGZPBUobJdX7N5Rzr7FX6LD8vEewhXWxSfbXvsaN",
      "addressTo": "iupiTuL2cshxB9UNauXNXe9iyCcqka7jCotodcEHGpNXeLzqG"
    },
    {
        "id": 1852775,
        "txId": "0d68341fb972ebf64339b8708f20c2aec1c59f855a810f70383f0edfd909addb",
        "from": "2XjBPiQCFocGWr7yyGggk1izdhFPcYYhd1brFFQwVfR9P2wfR",
        "to": "2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR",
        "amount": "5.00000000",
        "symbol": "ELF",
        "action": "Transferred",
        "isCrossChain": "no",
        "relatedChainId": "AELF",
        "memo": 'Latte',
        "txFee": {},
        "time": "2024-01-17T05:23:37.4617799Z",
        "method": "ManagerForwardCall",
        "blockHeight": 199382890,
        "addressFrom": "2byCxwWwtnyR33yWMoT3cK7BMtHspUD8UTQJXGJLdToxr5dnbQ",
        "addressTo": "iupiTuL2cshxB9UNauXNXe9iyCcqka7jCotodcEHGpNXeLzqG"
      },
      {
        "id": 1852756,
        "txId": "7a8ba20463ea90f540a31be7d2fb68ec5f0427cf0b3c6da74ed0d263645f7a3b",
        "from": "J3fNf2mHedV4YgG739qf74VF9NDthZRsmsnLknRspbPxzkZQR",
        "to": "2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR",
        "amount": "3.00000000",
        "symbol": "ELF",
        "action": "Transferred",
        "isCrossChain": "no",
        "relatedChainId": "AELF",
        "memo": "Bread",
        "txFee": {},
        "time": "2024-01-17T05:10:12.3553201Z",
        "method": "ManagerForwardCall",
        "blockHeight": 199381312,
        "addressFrom": "xwfmeFMkzsJU5fj3StDD68A5hQHKDcQorpWFZTyXiMUFLmPs6",
        "addressTo": "iupiTuL2cshxB9UNauXNXe9iyCcqka7jCotodcEHGpNXeLzqG"
      },
      {
        "id": 1852755,
        "txId": "51315e78ecb1cdce6eb3bd1118aad21fb5ee9b7537bd79a5b212887e340b0cef",
        "from": "J3fNf2mHedV4YgG739qf74VF9NDthZRsmsnLknRspbPxzkZQR",
        "to": "2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR",
        "amount": "3.00000000",
        "symbol": "ELF",
        "action": "Transferred",
        "isCrossChain": "no",
        "relatedChainId": "AELF",
        "memo": "Coffee",
        "txFee": {},
        "time": "2024-01-17T05:09:53.5213026Z",
        "method": "ManagerForwardCall",
        "blockHeight": 199381277,
        "addressFrom": "xwfmeFMkzsJU5fj3StDD68A5hQHKDcQorpWFZTyXiMUFLmPs6",
        "addressTo": "iupiTuL2cshxB9UNauXNXe9iyCcqka7jCotodcEHGpNXeLzqG"
      }
      
      
  ];

  useEffect(() => {
    const memoCounts = products.reduce((counts, product) => {
      counts[product] = 0;
      return counts;
    }, {});

    list.forEach((item) => {
      const memo = item.memo;
      if (memo) {
        products.forEach((product) => {
          if (memo.includes(product)) {
            memoCounts[product] += 1;
          }
        });
      }
    });

    const totalMemos = list.filter((item) => item.memo).length;

    const memoPercentage = products.map((product) => {
      return {
        label: product,
        y: ((memoCounts[product] / totalMemos) * 100).toFixed(2),
      };
    });

    setMemoData({
      labels: products,
      dataPoints: memoPercentage,
    });
  }, [list]);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: '',
    },
    data: [
      {
        type: 'doughnut',
        startAngle: 60,
        toolTipContent: '{label}: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: memoData.dataPoints,
      },
    ],
  };

  return (
    <div>
      <h2>Memo Pie Chart</h2>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default MemoPieChart;