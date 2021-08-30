const navLinks = document.querySelectorAll(".nav-item");
const tabContent = document.querySelectorAll(".tab-pane");
const navTab = document.querySelector(".nav-tabs");

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        if (this.classList.contains("active")) return;
        showContent(i);
        navLinks.forEach((content) => {
            content.classList.remove("active");
        });
        navLinks[i].classList.add("active");
    });
}

function showContent(index) {
    tabContent.forEach((content) => {
        content.classList.remove("active");
    });
    tabContent[index].classList.add("active");
}
