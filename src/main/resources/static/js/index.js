console.log("inside index.js")

    // Get the elements by their IDs
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const text3 = document.getElementById('text3');

    // Function to toggle visibility of headings
    function toggleHeadings() {
    if (text1.style.display === 'block') {
    text1.style.display = 'none';
    text2.style.display = 'block';
} else if (text2.style.display === 'block') {
    text2.style.display = 'none';
    text3.style.display = 'block';
} else {
    text3.style.display = 'none';
    text1.style.display = 'block';
}
}

function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function(data) {
            return data.features[0].center;
        });
}

function reverseGeocode(coordinates, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
        })
        // to get all the data from the request, comment out the following three lines...
        .then(function(data) {
            return data.features[0].place_name;
        });
}

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3BmbHVnY29kZXVwIiwiYSI6ImNsZ3dnd2djNjFrZ2wzbnFpdzdjMDRhZG4ifQ.JcZeoMJPkDgCpLTXWdfrSA';

let citySearch = document.querySelector('#searchBox')

// function goToInput() {
//     let searchedCity = citySearch.value;
//
//     geocode(searchedCity, MAPBOX_TOKEN).then((data) => {
//         console.log(data);
//
//         // Assuming data has 'latitude' and 'longitude' properties
//         let lat = data[1];
//         let long = data[0];
//
//         // Now 'latitude' and 'longitude' contain the values from the data
//         console.log("Latitude:", lat);
//         console.log("Longitude:", long);
//
//         const apiUrlToken = "https://test.api.amadeus.com/v1/security/oauth2/token";
//         const clientId = "jGAH9x2bXMOP1SAMGeocuUWBU0PGgpY4";
//         const clientSecret = "W6QETDbFu24l9gBl";
//
//         const formData = new URLSearchParams();
//         formData.append("grant_type", "client_credentials");
//         formData.append("client_id", clientId);
//         formData.append("client_secret", clientSecret);
//
//         fetch(apiUrlToken, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//
//
//         const accessToken = data.client_id;
//
//         let latitude = lat;
//         let longitude =  long;
//         const radius = 21;
//
// // Create the URL with query parameters
//         const apiUrl = `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
//
// // Set up the request headers
//         const headers = {
//             Authorization: `Bearer ${accessToken}`,
//         };
//
// // Make the GET request to the API
//         fetch(apiUrl, { headers })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 // Handle and process the API response data here
//                 console.log(data);
//             })
//             .catch((error) => {
//                 // Handle errors here
//                 console.error('Error:', error);
//             });
//
//
//     });
// }

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
})


// Call toggleHeadings every 3 seconds (3000 milliseconds)
    setInterval(toggleHeadings, 3000);

// const apiUrlToken = "https://test.api.amadeus.com/v1/security/oauth2/token";
// const clientId = "jGAH9x2bXMOP1SAMGeocuUWBU0PGgpY4";
// const clientSecret = "W6QETDbFu24l9gBl";
//
// const formData = new URLSearchParams();
// formData.append("grant_type", "client_credentials");
// formData.append("client_id", clientId);
// formData.append("client_secret", clientSecret);
//
// fetch(apiUrlToken, {
//     method: 'POST',
//     body: formData,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     },
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error(error);
//     });


