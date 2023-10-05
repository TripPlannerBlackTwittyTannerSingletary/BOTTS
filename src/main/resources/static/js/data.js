// async function fetchData() {
//
//     const backEndData = 'put back end data here for data storage';
//
//     try {
//         const response = await fetch(backEndData);
//         if (!response.ok) {
//             throw new Error('Error: ${response.status}')
//         }
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Fetch data error', error);
//     }
// }
//
// fetchData();
//
// async function fetchActivities() {
//
//     const backEndData = '/api/activities';
//
//     try {
//         const response = await fetch(backEndData);
//         if (!response.ok) {
//             throw new Error('Error: ${response.status}')
//         }
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Fetch data error', error);
//     }
// }
//
// fetchActivities();
//
// async function fetchSearches() {
//
//     const backEndData = '/api/search';
//
//     try {
//         const response = await fetch(backEndData);
//         if (!response.ok) {
//             throw new Error('Error: ${response.status}')
//         }
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Fetch data error', error);
//     }
// }
//
// fetchSearches();