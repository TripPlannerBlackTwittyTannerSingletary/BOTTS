const editModal = document.getElementById("editModal");
const editOverlay = document.getElementById("editOverlay");
const editButton = document.getElementById("editProfileBtn");
const closeEditModal = document.getElementById("closeModalEdit");
const editForm = document.getElementById("editForm");


editButton.addEventListener("click", () => {
    editOverlay.style.display = "block";
    editModal.style.display = "block";
});

closeEditModal.addEventListener("click", () => {
    editOverlay.style.display = "none";
    editModal.style.display = "none";
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
});

// editForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//
//     const email = document.getElementById("email").value;
//     const location = document.getElementById("location").value;
//
//     document.getElementById("email").textContent = email;
//     document.getElementById("location").textContent = location;
//
//     editModal.style.display = "none";
//     editOverlay.style.display = "none";
// });

async function submitEdit() {
    console.log("inside submitEdit");
    const email = document.getElementById('newEmail').value;
    const location = document.getElementById('newLocation').value;
    // const userid = document.getElementById('user').value
    const userEdit = {
        // User: userid,
        email: email,
        location: location
        // Add any additional form fields here
    };
    console.log(userEdit);
    console.log(csrfToken);
    try {
        const response = await fetch('/save-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(userEdit),
        });

        if (response.ok) {
            const responseData = await response.text();
            console.log(responseData); // Display success message
            closeModal(); // Close the modal after successful submission
            location.reload();
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

editForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitEdit()
    location.reload()
});

// editForm.addEventListener('submit', (event) => {
//     location.reload();
// });
