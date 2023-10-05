// Get the modal and buttons
const editModal = document.getElementById("editModal");
const editButton = document.getElementById("editButton");
const closeModal = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");

// Show the modal when the Edit button is clicked
editButton.addEventListener("click", () => {
    editModal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
});

// Submit the form to save changes
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEmail = document.getElementById("newEmail").value;
    const newLocation = document.getElementById("newLocation").value;

    // Update the profile information
    document.getElementById("email").textContent = newEmail;
    document.getElementById("location").textContent = newLocation;

    // Close the modal
    editModal.style.display = "none";
});
