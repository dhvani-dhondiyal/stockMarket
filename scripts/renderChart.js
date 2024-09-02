import { fetchStockData } from './fetchData.js';
let stockChart = null;
function convertTimestamps(obj) {
    // Check if the current item is an object or an array
    if (typeof obj === 'object' && obj !== null) {
      // Iterate over each key in the object
      for (let key in obj) {
        // Check if the value is a timestamp (number) and convert it
        if (typeof obj[key] === 'number' && Number.isInteger(obj[key])) {           
          obj[key] = new Date(obj[key] * 1000).toLocaleDateString();
        } else if (typeof obj[key] === 'object') {
            // Recursively call the function for nested objects/arrays
        }
      }
    }
  
    return obj; // Return the updated object
  }


export const renderChart = async (stock,currentRange) => {
    const chartCtx = document.getElementById('stock-chart').getContext('2d');
    const data = await fetchStockData(stock, currentRange);

    const timestamps = data.map(d=> convertTimestamps(d.timeStamp));
 
    const prices = data.map(d => d.value ? d.value : 0);

    if(stockChart) { 
        console.log("In destroy");
        stockChart.destroy();
        stockChart=null;
    }

    stockChart = new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: `${stock} Price`,
                data: prices,
                borderColor: 'green',
                borderWidth: 3,
                fill: false
            }]
        },
        options: {
            scales: {
                x: { title: { display: false, text: 'Date' } },
                y: { title: { display: false, text: 'Price' } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return `Price: $${tooltipItem.raw}`;
                        },
                        title: (tooltipItem) => {
                            return `Date: ${tooltipItem[0].label}`;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    

};
