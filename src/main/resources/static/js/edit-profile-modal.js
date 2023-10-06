const editModal = document.getElementById("editModal");
const editButton = document.getElementById("editProfileBtn");
const closeEditModal = document.getElementById("closeModalEdit");
const editForm = document.getElementById("editForm");
const editOverlay = document.getElementById("editOverlay");

editButton.addEventListener("click", () => {
    editOverlay.style.display = "block";
    editModal.style.display = "block";
});

closeEditModal.addEventListener("click", () => {
    editOverlay.style.display = "none";
    editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEmail = document.getElementById("email").value;
    const newLocation = document.getElementById("location").value;

    document.getElementById("email").textContent = newEmail;
    document.getElementById("location").textContent = newLocation;

    editModal.style.display = "none";
    editOverlay.style.display = "none";
});
