const dropdown = document.getElementById("lessons-dropdown");
const trigger = dropdown.querySelector(".dropdown-trigger");

trigger.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("open");
});

document.addEventListener("click", () => {
  dropdown.classList.remove("open");
});
