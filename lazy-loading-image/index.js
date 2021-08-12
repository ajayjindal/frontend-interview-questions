const lazyImages = document.querySelectorAll("img[data-src]");

// callback function
const loadImg = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img')
    })

    observer.unobserve(entry.target)
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0
});

lazyImages.forEach((img) => imgObserver.observe(img));