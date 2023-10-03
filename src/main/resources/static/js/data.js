async function fetchData () {

    const backEndData = '/api/users';

    try {
        const response = await fetch(backEndData);
        if (!response.ok) {
            throw new Error('Error: ${response.status}')
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch data error', error);
    }
}
fetchData();