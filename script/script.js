document.getElementById("sidebar_open").addEventListener("click", sidebarOpen);
document.getElementById("sidebar_close").addEventListener("click", sidebarClose);
document.addEventListener("click", outsideClick);

const open = document.getElementById("sidebar_open");
const direction = document.getElementById("image_holder");
const sidebar = document.getElementById("sidebar");

function sidebarOpen() {
  sidebar.classList.add("open");
  sidebar.style.boxShadow = "2px 0 5px rgba(0, 0, 0, 0.5)";
  open.style.display = "none";
  direction.style.justifyContent = "right";
}

function sidebarClose() {
  sidebar.classList.remove("open");
  sidebar.style.boxShadow = "none";
  open.style.display = "block";
  direction.style.justifyContent = "left";
}

function outsideClick(event) {
  console.log(event.target);
  console.log(sidebar.contains(event.target));
  console.log(open.contains(event.target));
  if (!sidebar.contains(event.target) && !open.contains(event.target) && sidebar.classList.contains("open")) {
    sidebarClose();
  }
  event.stopPropagation(); 
}
