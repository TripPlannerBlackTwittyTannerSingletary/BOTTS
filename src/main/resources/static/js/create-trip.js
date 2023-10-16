
const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');


// Get the modal and buttons
const modal = document.getElementById('myModal');
const overlay = document.getElementById('overlay');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const tripForm = document.getElementById('tripForm');


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

function submitForm() {
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const userid = document.getElementById('user').value;
    const tripData = {
        name: name,
        location: location,
        User: userid
        // Add any additional form fields here
    };

    fetch('/api/trips/createTrip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(tripData),
    })
        .then(response => {
            if (response.status == 200) {
                return response.text();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(responseData => {
            console.log(responseData); // Display success message
            location.reload();
            closeModal(); // Close the modal after successful submission
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
    location.reload();
});




////// Delete the trip //////

const deleteTripButtons = document.querySelectorAll(".deleteTrip");

deleteTripButtons.forEach(deleteTripButton => {
    deleteTripButton.addEventListener("click", (e) => {
        e.preventDefault();
        const tripId = e.target.getAttribute('data-trip-id');

        const apiUrl = '/api/trips/deleteTrip' + tripId; // Replace with your actual API URL

        const shouldDelete = window.confirm('Are you sure you want to delete this trip?');
        if (shouldDelete) {


        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(`Trip with ID ${tripId} has been deleted.`);
                    location.reload();
                } else {
                    console.error(`Failed to delete trip with ID ${tripId}.`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }});
});





