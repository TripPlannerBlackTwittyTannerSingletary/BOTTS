const editModal = document.getElementById("editModal");
const editButton = document.getElementById("editProfileBtn");
const closeModal = document.getElementById("closeModalEdit");
const editForm = document.getElementById("editForm");
const overlay = document.getElementById("editOverlay");

const openEditModal = () => {
    overlay.style.display = "block";
    editModal.style.display = "block";
}

const closeEditModal = () => {
    overlay.style.display = "none";
    editModal.style.display = "none";
}

editButton.addEventListener("click", () => {
    openEditModal();
});

closeModal.addEventListener("click", () => {
    closeEditModal();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEmail = document.getElementById("newEmail").value;
    const newLocation = document.getElementById("newLocation").value;

    document.getElementById("email").textContent = newEmail;
    document.getElementById("location").textContent = newLocation;

    closeEditModal();
});
