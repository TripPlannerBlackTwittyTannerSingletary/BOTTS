(() => {
    const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');

    function geocode(search, token) {
        let baseUrl = 'https://api.mapbox.com';
        let endPoint = '/geocoding/v5/mapbox.places/';
        let startTime = new Date().getTime();
        return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
            .then(function (res) {
                let endTime = new Date().getTime();
                return res.json();
// to get all the data from the request, comment out the following three lines...
            }).then(function (data) {
                console.log(data);
                return data.features[0].center;
            });
    }

    function reverseGeocode(coordinates, token) {
        let baseUrl = 'https://api.mapbox.com';
        let endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
            .then(function (res) {
                return res.json();
            })
            // to get all the data from the request, comment out the following three lines...
            .then(function (data) {
                return data.features[0].place_name;
            });
    }

    function reverseGeocode2(coordinates, token) {
        console.log(coordinates);
        let baseUrl = 'https://api.mapbox.com';
        let endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(baseUrl + endPoint + coordinates.longitude + "," + coordinates.latitude + '.json' + "?" + 'access_token=' + token)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                return data.features[0].place_name;
            });
    }


    let citySearch = document.querySelector('#searchBox')


    const createCard = async (activity) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-5 col-4';
        cardDiv.setAttribute("data-activity-id", activity.amadeusApiId)
        cardDiv.innerHTML = `
<div class="card mb-5 col-4" data-activity-id="${activity.amadeusApiId}">
    <img src="${activity.imageUrl}" class="card-img-top" alt="Card Image" onerror="this.onerror=null; this.src='../IMG/placeholder.jpg'">
    <div class="card-body">
    <div>
        <h5 class="card-title row align-items-end">${activity.name}</h5>
    </div>
        <div class="mt-5">
        <button type="button" class="btn-53 container-fluid py-2 view-description-button">
            <div class="original">View Description</div>
            <div class="letters d-flex justify-content-center">
                <span>V</span>
                <span>I</span>
                <span>E</span>
                <span>W</span>
                <span>&nbsp;</span>
                <span>D</span>
                <span>e</span>
                <span>s</span>
                <span>c</span>
                <span>r</span>
                <span>i</span>
                <span>p</span>
                <span>t</span>
                <span>i</span>
                <span>o</span>
                <span>n</span>
            </div>
        </button>
        </div>
    </div>
            <ul class="list-group list-group-flush"></ul>
            <div class="card-body-links py-2 d-flex gap-3">
                <button type="button" class="btn-53 py-2 add-to-trip-button" style="flex: 1 0 0px;">
                    <div class="original">Add to Trip</div>
                    <div class="letters d-flex justify-content-center">
    
                        <span>A</span>
                        <span>D</span>
                        <span>D</span>
                        <span>&nbsp;</span>
                        <span>T</span>
                        <span>o</span>
                        <span>&nbsp;</span>
                        <span>T</span>
                        <span>r</span>
                        <span>i</span>
                        <span>p</span>
                    </div>
                </button>
                <a href="${activity.bookingLink}" target="_blank" class="btn-53 py-2 card-link book-now-link" style="flex: 1 0 0px;">
                    <div class="original">Book Now!</div>
                    <div class="letters d-flex justify-content-center">

                        <span>B</span>
                        <span>o</span>
                        <span>o</span>
                        <span>k</span>
                        <span>&nbsp;</span>
                        <span>N</span>
                        <span>o</span>
                        <span>w</span>
                        <span>!</span>
                    </div>
                </a>
            </div>
        </div>
        `

// Create card links
        const addToTripButton = cardDiv.querySelector('.add-to-trip-button');

// Add a click event listener to trigger the modal when the button is clicked
        addToTripButton.addEventListener('click', e => {
            $('#tripModal').modal('show'); // Use Bootstrap modal function to show the modal
            console.log(e.currentTarget.parentElement.parentElement.getAttribute('data-activity-id'));
            $('#tripModal').attr('data-activity-id', e.currentTarget.parentElement.parentElement.getAttribute('data-activity-id'));
        });

        const closeModalButton = document.querySelector('#closeModal');
        closeModalButton.addEventListener('click', () => {
            $('#tripModal').modal('hide'); // Use Bootstrap modal function to hide the modal
        });

        const cardLink2 = cardDiv.querySelector('.book-now-link');

        const modalButton = cardDiv.querySelector('.view-description-button');

        // Add event listener to display activity description in the modal
        modalButton.addEventListener('click', () => {
            const modalDescription = document.getElementById('activityDescription');
            modalDescription.innerHTML = activity.description;
            $('#activityModal').modal('show'); // Use Bootstrap modal function to show the modal
        });

        return cardDiv;
    };

    const renderCards = (activityData) => {
        console.log(activityData);
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';

        activityData.forEach(activity => {
            const card = createCard(activity);
            cardContainer.appendChild(card);
        });
    }


    // let items = goToInput();
    let itemsPerPage = 25;
    let paginationContainer = document.getElementById('card-container');

    const loader = document.getElementById('animation');

    async function goToInput() {
        let searchedCity = citySearch.value;

        try {

            const data = await geocode(searchedCity, API_KEY_ONE);
            let lat = data[1];
            let long = data[0];

            const apiUrlToken = "https://test.api.amadeus.com/v1/security/oauth2/token";
            const clientId = "bf8eAtJgHUGxJqsnrDN7nqp7zygPMQKf";
            const clientSecret = "QhzbGdy5eQ66Y0CE";

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

            const responseActivities = await fetch(apiUrl, {headers});

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
    const searchCityButton = document.querySelector('#search-city');
    console.log(searchCityButton);
    searchCityButton.addEventListener('click', async () => {
        console.log("inside search city event listener");
        loader.style.display = 'block';
        console.log(citySearch.value)
        try {
            // fetch to '/api/search'
            let baseUrl = '/api/search';

            let results = await fetch(baseUrl, {

// Adding method type
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({search: citySearch.value})
            });
            console.log(results);
            let activityData = await results.json();
            console.log(activityData.length);
            if(activityData.length === 0) {
                activityData = await goToInput();
                console.log(activityData);
                console.log('paginate() call')
                activityData = await packageSearchObject(activityData.data, citySearch.value)
                console.log(activityData)
            }
            await paginate(activityData, itemsPerPage, paginationContainer);
            loader.style.display = 'none';
        } catch (error) {
            console.error('Error rendering cards:', error);
        }

    });

    async function packageSearchObject(activities, search) {
        let activityList = [];
        for(const activity of activities) {
            let address = await reverseGeocode2(activity.geoCode, API_KEY_ONE);

            let newActivity = {
                name: activity.name,
                description: activity.description,
                rating: 1.00,
                bookingLink: activity.bookingLink,
                address: address,
                latitude: activity.geoCode.latitude,
                longitude: activity.geoCode.longitude,
                imageUrl: activity.pictures[0],
                amadeusApiId: activity.id
            }
            activityList.push(newActivity)
        };

        let searchObject = {
            search: search,
            activities: activityList
        }
        let baseUrl = '/api/test';
        let results = await fetch(baseUrl, {
// Adding method type
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
// Adding body or contents to send

            body: JSON.stringify(searchObject)

        });
        let data = await results.json();
        return data.activities;

    }


    function paginate(items, itemsPerPage, paginationContainer) {
        let currentPage = 1;
        const totalPages = Math.ceil(items.length / itemsPerPage);

        function showItems(page) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageItems = items.slice(startIndex, endIndex);
            const cardContainer = document.getElementById('card-container');
            cardContainer.innerHTML = '';

            pageItems.forEach(async activity => {
                const card = await createCard(activity);
                cardContainer.appendChild(card);
            });
        }

        function setupPagination() {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = "";

            for (let i = 1; i <= totalPages; i++) {
                const link = document.createElement("a");
                link.className = 'px-2'
                link.href = "#";
                link.innerText = i;

                if (i === currentPage) {
                    link.classList.add("active");
                }

                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    currentPage = i;
                    showItems(currentPage);

                    const currentActive = pagination.querySelector(".active");
                    currentActive.classList.remove("active");
                    link.classList.add("active");
                });

                pagination.appendChild(link);
            }
        }

        showItems(currentPage);
        setupPagination();
    }



    async function populateTripDropdown() {
        const response = await fetch('/api/trips/trips'); // Replace this URL with the actual endpoint to fetch user's trips
        console.log(response)
        const trips = await response.json();
        const tripSelect = document.getElementById('tripSelect');
        tripSelect.innerHTML = '';

        trips.forEach(trip => {
            const option = document.createElement('option');
            option.value = trip.id;
            option.text = trip.name;
            tripSelect.appendChild(option);
        });
    }

    $('#tripModal').on('show.bs.modal', async function (event) {
        await populateTripDropdown();
    });

    async function saveActivityToTrip(tripId, activityId) {
        const parsedTripId = parseInt(tripId);
        const parsedActivityId = parseInt(activityId);
        console.log(typeof parsedActivityId)
        console.log(typeof parsedTripId)
        const url = '/api/activities/addActivity/'+activityId;
        const data = {
            id: parsedTripId
        };
        console.log(csrfToken);
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(data)
        });
    }


    const saveActivityButton = document.getElementById('save-activity');
    saveActivityButton.addEventListener('click', () => {
        const selectedTripId = document.getElementById('tripSelect').value;
        // const selectedTrip = document.getElementById('tripSelect').name

        saveActivityToTrip(selectedTripId, $('#tripModal').attr('data-activity-id'))
            .then(() => {
                $('#tripModal').modal('hide'); // Close the modal after saving the activity
                alert('Activity succesfully added to your trip!')
            })
            .catch(error => {
                alert('There was a problem adding the activity to your trip.')
                console.error('Error saving activity to trip:', error);
            });
    });

    async function isValidImage(url){
        let response = await fetch(url);
        console.log(response.status);
        return response.status == 200;
    }


})();