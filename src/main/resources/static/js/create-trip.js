
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


async function submitForm() {
    try {
        const name = document.getElementById('name').value;
        const locationName = document.getElementById('location').value;
        const userid = document.getElementById('user').value;
        const tripData = {
            name: name,
            location: locationName,
            User: userid
            // Add any additional form fields here
        };

        const response = await fetch('/api/trips/createTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(tripData),
        });

        if (response.status === 200) {
            const responseData = await response.text();
            console.log(responseData); // Display success message
            closeModal(); // Close the modal after successful submission
           location.reload();
        } else {
            throw new Error('Error: ' + response.status);
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

tripForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitForm();
});




////// Delete the trip //////

const deleteTripButtons = document.querySelectorAll(".deleteTrip");



deleteTripButtons.forEach(deleteTripButton => {
    deleteTripButton.addEventListener("click", (e) => {
        e.preventDefault();
        const tripId = e.target.getAttribute('data-trip-id');
        const deleteModal = document.getElementById('deleteModal');
        const deleteConfirm = document.getElementById('deleteConfirm');
        const deleteCancel = document.getElementById('deleteCancel');

        deleteModal.style.display = 'block';

        deleteModal.addEventListener("click", (event) => {
            if (event.target === deleteModal) {
                deleteModal.style.display = 'none';
            }
        });


        deleteConfirm.addEventListener("click", () => {
            const apiUrl = '/api/trips/deleteTrip' + tripId; // Replace with your actual API URL

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

            deleteModal.style.display = 'none';
        });

        deleteCancel.addEventListener("click", () => {
            deleteModal.style.display = 'none';
        });
    });
});






