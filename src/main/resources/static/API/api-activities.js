async function fetchData() {
    try {
        const response = await fetch('');
        if (!response.ok) {
            throw new Error('API is not working');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function renderData(data) {
    const apiDataContainer = document.getElementById('api-data');
    apiDataContainer.innerHTML = JSON.stringify(data, null, 2);
}

async function main() {
    try {
        const data = await fetchData();
        renderData(data);
    } catch (error) {
        console.log('Error data is not rendering', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', main);
