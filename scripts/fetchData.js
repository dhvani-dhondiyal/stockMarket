export const fetchStockData = async (currentStock, currentRange) => {

  const response = await fetch(`https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata?range=${currentRange}&stock=${currentStock}`);
  const data = await response.json();

  if (Array.isArray(data['stocksData'][0][currentStock])) {
    return data['stocksData'][0][currentStock];
  } else {
    const valuesArray = Object.values(data['stocksData'][0][currentStock]);
    return valuesArray;
  }
};

export const fetchStockProfileData = async (stock) => {
  const response = await fetch(`https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata?stock=${stock}`);
  const data = await response.json();
  return data['stocksProfileData'][0][stock]['summary'];
};

export const fetchStockStatsData = async (stock) => {
  const response = await fetch(`https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata?stock=${stock}`);
  const data = await response.json();
  return data;
};
