// tims code

function geocode(search, token) {
    let baseUrl = 'https://api.mapbox.com';
    let endPoint = '/geocoding/v5/mapbox.places/';
    let startTime = new Date().getTime();
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            let endTime = new Date().getTime();
            console.log(endTime - startTime);
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function(data) {
            return data.features[0].center;
        });
}

function reverseGeocode(coordinates, token) {
    let baseUrl = 'https://api.mapbox.com';
    let endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
        })
        // to get all the data from the request, comment out the following three lines...
        .then(function(data) {
            return data.features[0].place_name;
        });
}




let citySearch = document.querySelector('#searchBox')


function goToInput() {
    let searchedCity = citySearch.value;

    // Assuming geocode() returns a promise resolving to an array with latitude and longitude
    geocode(searchedCity, MAPBOX_TOKEN).then((data) => {
        let lat = data[1];
        let long = data[0];

        const apiUrlToken = "https://test.api.amadeus.com/v1/security/oauth2/token";
        const clientId = "jGAH9x2bXMOP1SAMGeocuUWBU0PGgpY4";
        const clientSecret = "W6QETDbFu24l9gBl";

        const formData = new URLSearchParams();
        formData.append("grant_type", "client_credentials");
        formData.append("client_id", clientId);
        formData.append("client_secret", clientSecret);

        fetch(apiUrlToken, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => response.json())
            .then(tokenData => {
                const accessToken = tokenData.access_token;

                const apiUrl = `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${long}&radius=21`;

                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                fetch(apiUrl, { headers })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((activityData) => {
                        // Handle and process the activity data here
                        console.log(activityData);
                    })
                    .catch((error) => {
                        // Handle errors here
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    });
}

document.querySelector('#search-city').addEventListener('click', () => {
    goToInput();


// Beau's code
    function renderData(data) {
        const apiDataContainer = document.getElementById('api-data');
        apiDataContainer.innerHTML = JSON.stringify(data, null, 2);
    }

    async function main() {
        try {
            const data = await goToInput;
            renderData(data);
        } catch (error) {
            console.log('Error data is not rendering', error);
            throw error;
        }
    }

    document.addEventListener('DOMContentLoaded', main);
})




// async function fetchData() {
//     try {
//         const response = await fetch('');
//         if (!response.ok) {
//             throw new Error('API is not working');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }







