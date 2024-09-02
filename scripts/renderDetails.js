export const renderDetails = (stock, profileData, statsData) => {
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = `
        <h2>${stock} <span class="${statsData['profit'] > 0 ? 'green' : 'red'}">${statsData['profit']}%</span> <span>$${statsData['bookValue']}</span></h2>
        <p> ${profileData}</p>
    `;
};
