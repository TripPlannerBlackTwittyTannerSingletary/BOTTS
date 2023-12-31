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
async function submitEdit() {
    console.log("inside submitEdit");
    const email = document.getElementById('newEmail').value;
    const location = document.getElementById('newLocation').value;
    // const userid = document.getElementById('user').value
    const userEdit = {
        // User: userid,
        email: email,
        location: location
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
            console.log(responseData);
            closeModal();
            await location.reload();
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
    location.reload();
}


editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitEdit();
});


