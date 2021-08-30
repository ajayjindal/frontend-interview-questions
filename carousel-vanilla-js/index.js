const tracks = document.querySelector(".carousel-track");
const images = Array.from(tracks.children);
const leftButton = document.querySelector(".nav-left");
const rightButton = document.querySelector(".nav-right");
const width = images[0].getBoundingClientRect().width;

images.forEach((img, index) => {
    img.style.left = width * index + "px";
});
function moveToSlide(current, target) {
    tracks.style.transform = `translateX(-${target.style.left})`;
    current.classList.remove("current-slide");
    target.classList.add("current-slide");
}
leftButton.addEventListener("click", () => {
    const currentSlide = tracks.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    prevSlide ? moveToSlide(currentSlide, prevSlide) : null;
});

rightButton.addEventListener("click", () => {
    const currentSlide = tracks.querySelector(".current-slide");
    const nextSlide = currentSlide?.nextElementSibling;
    // move to new slide
    nextSlide ? moveToSlide(currentSlide, nextSlide) : null;
});
