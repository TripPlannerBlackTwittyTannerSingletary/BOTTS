function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get references to the dropdown input fields
const departureAirportInput = document.getElementById("departureAirport");
const arrivalAirportInput = document.getElementById("arrivalAirport");
const passengersInput = document.getElementById("adults-input");
const departureDateInput = document.getElementById("departure-date");
const returnDateInput = document.getElementById("return-date");


let flightIndex = 1;
function createFlightCard(flight) {
    const card = document.createElement('div');
    card.className = 'flight-card card mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `Flight ${flightIndex}`;

    const price = document.createElement('p');
    price.className = 'card-text';
    price.textContent = `Price: ${flight.price.grandTotal}`;

    const duration = document.createElement('p');
    duration.className = 'card-text';
    duration.textContent = `Duration: ${flight.itineraries[0].duration}`;

    const oneWay = document.createElement('p');
    oneWay.className = 'card-text';
    oneWay.textContent = `One Way: ${flight.oneWay}`;

    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(duration);
    cardBody.appendChild(oneWay);

    card.appendChild(cardBody);

    return card;
}


async function getAccessToken() {
    const apiUrlToken = "https://test.api.amadeus.com/v1/security/oauth2/token";
    const clientId = "J1sv7nr6Am8RtlvTIL0vAHKPNXxnuXrK";
    const clientSecret = "7N7VgqM7AFQnG00V";

    const formData = new URLSearchParams();
    formData.append("grant_type", "client_credentials");
    formData.append("client_id", clientId);
    formData.append("client_secret", clientSecret);

    try {
        const responseToken = await fetch(apiUrlToken, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const tokenData = await responseToken.json();
        const accessToken = tokenData.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

document.getElementById("bookingForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const departureDateValue = formatDateToYYYYMMDD(new Date(departureDateInput.value));
    const returnDateValue = formatDateToYYYYMMDD(new Date(returnDateInput.value));
    const departureAirportValue = departureAirportInput.value;
    const arrivalAirportValue = arrivalAirportInput.value;
    const passengersValue = passengersInput.value;

    try {
        const accessToken = await getAccessToken(); // Get access token

        const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departureAirportValue}&destinationLocationCode=${arrivalAirportValue}&departureDate=${departureDateValue}&returnDate=${returnDateValue}&adults=${passengersValue}&children=0&infants=0&travelClass=ECONOMY&nonStop=false&currencyCode=USD&max=250`;
        // https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=LAX&destinationLocationCode=SAT&departureDate=2023-11-02&returnDate=2023-11-07&adults=1&children=1&infants=1&travelClass=BUSINESS&nonStop=false&max=250
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const flightData = await response.json();
        console.log(flightData);
        const flightCardsContainer = document.getElementById('flightCardsContainer');
        flightCardsContainer.innerHTML = '';

        // Render flight cards based on API response
        flightData.data.forEach(flight => {
            const flightCard = createFlightCard(flight);
            flightCardsContainer.appendChild(flightCard);
            flightIndex++
        });
    } catch (error) {
        console.error('Error fetching flight data:', error);
    }
});