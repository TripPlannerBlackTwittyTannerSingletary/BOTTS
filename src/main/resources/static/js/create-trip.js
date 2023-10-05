
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
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const userid = document.getElementById('user').value;
    const tripData = {
        name: name,
        location: location,
        User: userid
        // Add any additional form fields here
    };

    try {
        const response = await fetch('/api/trips/createTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
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



////////////////// lat and long info to back-end ///////////////////

