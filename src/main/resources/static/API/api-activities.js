(async () => {
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


    const createCard = (activity) => {
// Create the card element
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-5 col-4';
        cardDiv.style.width = '18rem';
        cardDiv.setAttribute("data-activity-id", activity.id)

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

// Create list group
        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush';


        cardDiv.appendChild(cardBody);
        cardDiv.appendChild(listGroup);

// Create additional card body for links
        const cardBodyLinks = document.createElement('div');
        cardBodyLinks.className = 'card-body d-flex gap-3';

// Create card links
        const addToTripButton = document.createElement('button');
        addToTripButton.type = 'button';
        addToTripButton.className = 'btn-53 py-2';
        addToTripButton.style = 'flex: 1 0 0;'
        addToTripButton.innerHTML = `
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
        `;

// Add a click event listener to trigger the modal when the button is clicked
        addToTripButton.addEventListener('click', e => {
            $('#tripModal').modal('show'); // Use Bootstrap modal function to show the modal
            console.log(e.currentTarget.parentElement.parentElement.getAttribute('data-activity-id'));
            $('#tripModal').attr('data-activity-id', e.currentTarget.parentElement.parentElement.getAttribute('data-activity-id'));
        });



        const closeModalButton = document.querySelector('.modal .close');
        closeModalButton.addEventListener('click', () => {
            $('#tripModal').modal('hide'); // Use Bootstrap modal function to hide the modal
        });

        const cardLink2 = document.createElement('a');
        cardLink2.href = activity.bookingLink; // Set link URL dynamically
        cardLink2.className = 'btn-53 py-2 card-link';
        cardLink2.style = 'flex: 1 0 0;'
        cardLink2.innerHTML = `
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
        `; // Set link text dynamically

        const modalButton = document.createElement('button');
        modalButton.type = 'button';
        modalButton.className = 'btn-53 container-fluid py-2';
        modalButton.innerHTML = `
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
        `;


        // Add event listener to display activity description in the modal
        modalButton.addEventListener('click', () => {
            const modalDescription = document.getElementById('activityDescription');
            modalDescription.innerHTML = activity.description;
            $('#activityModal').modal('show'); // Use Bootstrap modal function to show the modal
        });

        // Add the button to the card body
        cardBody.appendChild(modalButton);

        cardBodyLinks.appendChild(addToTripButton);
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


    let items = goToInput();
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
            const clientId = "J1sv7nr6Am8RtlvTIL0vAHKPNXxnuXrK";
            const clientSecret = "7N7VgqM7AFQnG00V";

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

    document.querySelector('#search-city').addEventListener('click', async () => {
        loader.style.display = 'block';
        try {
            const activityData = await goToInput();
            console.log('paginate() call')
            console.log(activityData)

            packageSearchObject(activityData.data, citySearch.value)
// renderCards(activityData.data);
            paginate(activityData.data, itemsPerPage, paginationContainer);
            console.log('paginate() call')
            loader.style.display = 'none';
        } catch (error) {
            console.error('Error rendering cards:', error);
        }

    });

    async function packageSearchObject(activities, search) {
        let activityList = [];
        for(const activity of activities) {
            let address = await reverseGeocode2(activity.geoCode, API_KEY_ONE);
// console.log(address);
            let newActivity = {
                name: activity.name,
                description: activity.description,
                rating: 1.00,
                bookingLink: activity.bookingLink,
                address: address,
                latitude: activity.geoCode.latitude,
                longitude: activity.geoCode.longitude,
                amadeusApiId: activity.id
            }
            activityList.push(newActivity)
        }
// activities.forEach(async (activity) => {
//     let address = await reverseGeocode2(activity.geoCode, API_KEY_ONE);
//     console.log(address);
//     let newActivity = {
//         name: activity.name,
//         description: activity.description,
//         rating: 1.00,
//         bookingLink: activity.bookingLink,
//         address: address,
//         latitude: activity.geoCode.latitude,
//         longitude: activity.geoCode.longitude,
//         amadeusApiId: activity.id
//     }
//     activityList.push(newActivity)
// })
        console.log(search)
        console.log(activityList)
        let searchObject = {
            search: search,
            activities: activityList
        }
        let baseUrl = '/api/test';
// let endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(baseUrl, {

// Adding method type
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
// Adding body or contents to send

            body: JSON.stringify(searchObject)

        });

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

            pageItems.forEach(activity => {
                const card = createCard(activity);
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

        saveActivityToTrip(selectedTripId, $('#tripModal').attr('data-activity-id'))
            .then(() => {
                $('#tripModal').modal('hide'); // Close the modal after saving the activity
            })
            .catch(error => {
                console.error('Error saving activity to trip:', error);
            });
    });



})();