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

const createCard = (activity) => {
    const card = document.createElement('div');
    card.className = 'card';

    const cardTitle = document.createElement('h2');
    cardTitle.innerText = activity.name;
    card.appendChild(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.innerText = activity.description;
    card.appendChild(cardDescription);

    return card;
}

const renderCards = (activityData) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    activityData.forEach(activity => {
        const card = createCard(activity);
        cardContainer.appendChild(card);
    });
}

async function goToInput() {
    let searchedCity = citySearch.value;

    try {
        // Assuming geocode() returns a promise resolving to an array with latitude and longitude
        const data = await geocode(searchedCity, MAPBOX_TOKEN);
        let lat = data[1];
        let long = data[0];

        const apiUrlToken = "https://test.api.amadeus.com/v1/security/oauth2/token";
        const clientId = "jGAH9x2bXMOP1SAMGeocuUWBU0PGgpY4";
        const clientSecret = "W6QETDbFu24l9gBl";

        const formData = new URLSearchParams();
        formData.append("grant_type", "client_credentials");
        formData.append("client_id", clientId);
        formData.append("client_secret", clientSecret);

        const responseToken = await fetch(apiUrlToken, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const tokenData = await responseToken.json();
        const accessToken = tokenData.access_token;

        const apiUrl = `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${long}&radius=21`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const responseActivities = await fetch(apiUrl, { headers });

        if (!responseActivities.ok) {
            throw new Error(`HTTP error! Status: ${responseActivities.status}`);
        }

        const activityData = await responseActivities.json();

        console.log(activityData);

        return activityData;
    } catch (error) {
        // Handle errors here
        console.error('Error:', error);
        throw error;
    }
}

document.querySelector('#search-city').addEventListener('click', async () => {
    try {
        const activityData = await goToInput();
        packageSearchObject(activityData.data, citySearch)
        renderCards(activityData.data);
    } catch (error) {
        console.error('Error rendering cards:', error);
    }
});

function packageSearchObject(activities, search){
    let activityList = [];
    activities.forEach((activity) => {
        let newActivity = {
            name: activity.name,
            description: activity.description,
            rating: activity.rating,
            bookingLink: activity.self,
            address: activity.geoCode,
            latitude: activity.geoCode.latitude,
            longitude: activity.geoCode.longitude,
            amadeusApiId: activity.id
        }
    activityList.push(newActivity)
    });
    console.log(activityList)
    // this.name = name;
    // this.description = description;
    // this.rating = rating;
    // this.bookingLink = bookingLink;
    // this.address = address;
    // this.latitude = latitude;
    // this.longitude = longitude;
    // this.amadeusApiId = amadeusApiId;

    let searchObject = {
        search: search,
        activities: activityList
    }
}


