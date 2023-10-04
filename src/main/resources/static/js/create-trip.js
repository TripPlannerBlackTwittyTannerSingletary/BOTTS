// Empty array so the trips can be stored once they are created
const trips = [];

// The create funtion buddy
const createTrips = (destination, startDate, endDate) => {
    const trip =  new Trip(destination, startDate, endDate);
    trips.push(trip);
}

// Get the modal and buttons
const modal = document.getElementById('myModal');
const overlay = document.getElementById('overlay');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const tripForm = document.getElementById('tripForm');

const tripData = {
    name: name
};



// Open the modal when the button is clicked
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

// Close the modal when the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
});

// Handle form submission (you can replace this with your server-side code)
tripForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;


    // Perform your form validation and submission logic here

    // Close the modal
    modal.style.display = 'none';
});

async function submitForm() {
    const name = document.getElementById('name').value;
    const tripData = {
        name: name
        // Add any additional form fields here
    };

    try {
        const response = await fetch('/api/trips/createTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
        });

        if (response.ok) {
            const responseData = await response.text();
            console.log(responseData); // Display success message
            closeModal(); // Close the modal after successful submission
        } else {
            console.error('Error:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
function closeModal() {
    const modal = document.getElementById('myModal');
    const overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}


// Add an event listener to the form submission

tripForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm();
});