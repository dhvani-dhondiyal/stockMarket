import { renderChart } from './renderChart.js';
import { renderDetails } from './renderDetails.js';
import { fetchStockProfileData, fetchStockStatsData } from './fetchData.js';
let currentRange = '1month';
let currentStock = "AAPL";
const Stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];

export const renderList = async () => {
    const listContainer = document.getElementById('list');
    const stockUL = document.createElement('ul');
    const stockInfoUL = document.createElement('ul');
    stockInfoUL.classList.add("stock-info-ul");
    let textClass = 'green';
    const liData = await fetchStockStatsData(Stocks[0]);

    Stocks.forEach(stock => {        
        const stockItem = document.createElement('li');
        const stockItemInfo = document.createElement('li');
        const stockItemInfoSpan = document.createElement('span');        
        stockItemInfo.textContent = "$"+parseFloat(liData.stocksStatsData[0][stock]['bookValue']).toFixed(3);
        stockItemInfoSpan.textContent = parseFloat(liData.stocksStatsData[0][stock]['profit']).toFixed(2)+"%"; 
           
        if (liData.stocksStatsData[0][stock]['profit'] === 0) {
            textClass = 'red';
        } else {
            textClass = 'green';
        }
        stockItemInfoSpan.classList.add(textClass);
        stockItemInfo.appendChild(stockItemInfoSpan);
        stockItem.textContent = stock;
        stockItem.classList.add('stock-item');
        stockItem.onclick = async () => {            
            const profileData = await fetchStockProfileData(stock);
            const statsData = await fetchStockStatsData(stock);
            renderDetails(stock, profileData, statsData['stocksStatsData'][0][stock]);
            currentStock=stock;
            renderChart(stock,currentRange);
        };
        stockUL.appendChild(stockItem);
        stockInfoUL.appendChild(stockItemInfo);
    });
    const profileData = await fetchStockProfileData(currentStock);
    const statsData = await fetchStockStatsData(currentStock);
    renderDetails(currentStock, profileData, statsData['stocksStatsData'][0][currentStock]);
    renderChart(currentStock, currentRange);
    listContainer.appendChild(stockUL);
    listContainer.appendChild(stockInfoUL);
    const buttonDiv = document.createElement('div');
    
    for (let i = 1; i < 5; i++) {
        const button_1m = document.createElement('button');
        button_1m.textContent = i + 'month';
        button_1m.onclick = async () => {            
            const profileData = await fetchStockProfileData(currentStock);
            const statsData = await fetchStockStatsData(currentStock);
            currentRange = i + 'month';
            renderDetails(currentStock, profileData, statsData['stocksStatsData'][0][currentStock]);
            renderChart(currentStock,currentRange);
        };
        buttonDiv.appendChild(button_1m);        
    }
    const chartCont = document.getElementById('charts');
    chartCont.appendChild(buttonDiv);
};
async function updateChartRange(range) {
    currentRange = range;
    renderChart(currentStock,currentRange);
  }
renderList();
