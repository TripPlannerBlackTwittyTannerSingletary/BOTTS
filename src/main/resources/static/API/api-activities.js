function geocode(search, token) {
    let baseUrl = 'https://api.mapbox.com';
    let endPoint = '/geocoding/v5/mapbox.places/';
    let startTime = new Date().getTime();
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            let endTime = new Date().getTime();
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
// Create the card element
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.width = '18rem';

// Create the card image (replace 'activity.imageUrl' with the actual image URL property from your activity object)
    const img = document.createElement('img');
    img.src = activity.pictures[0]; // Set the image URL dynamically
    img.className = 'card-img-top';
    img.alt = 'Card Image';
    cardDiv.appendChild(img);

// Create the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

// Create card title
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = activity.name; // Set the card title dynamically
    cardBody.appendChild(cardTitle);

// Create card text
    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerHTML = activity.description; // Set the card description dynamically
    cardBody.appendChild(cardText);

// Create list group
    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush';

// Loop through activity items and create list items
// activity.items.forEach(item => {
//     const listItem = document.createElement('li');
//     listItem.className = 'list-group-item';
//     listItem.innerText = item; // Set list item content dynamically
//     listGroup.appendChild(listItem);
// });

    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(listGroup);

// Create additional card body for links
    const cardBodyLinks = document.createElement('div');
    cardBodyLinks.className = 'card-body';

// Create card links
    const cardLink1 = document.createElement('a');
    cardLink1.href = activity.price.amount; // Set link URL dynamically
    cardLink1.className = 'card-link';
    cardLink1.innerHTML = 'Add to trip'; // Set link text dynamically

    const cardLink2 = document.createElement('a');
    cardLink2.href = activity.bookingLink; // Set link URL dynamically
    cardLink2.className = 'card-link';
    cardLink2.innerHTML = 'Book Now!'; // Set link text dynamically

    cardBodyLinks.appendChild(cardLink1);
    cardBodyLinks.appendChild(cardLink2);

    cardDiv.appendChild(cardBodyLinks);

    return cardDiv;
};

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

