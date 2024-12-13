const showBtn = document.querySelector(".show");
const mixBtn = document.querySelector(".mix");
const imagesContainer = document.querySelector(".images");

const imgsPath = "imgs/";
const defaultImagePath = imgsPath + "default.gif";
const images = [
    "1.gif",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.gif",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
];
const isMobile = isMobileDevice();

// Render images event
showBtn.addEventListener("click", () => {
    imagesContainer.innerHTML = "";

    // Populate images container
    images.forEach((image, i) => {
        const imagePath = imgsPath + image;
        const imageEl = document.createElement("img");
        imageEl.src = imagePath;
        imageEl.dataset.nr = i;
        imageEl.classList.add("item");

        // Image swapping event
        // Add single click event if mobile device, since dblclick not working properly on mobiles
        imageEl.addEventListener(isMobile ? "click" : "dblclick", (e) => {
            const currentImg = e.target;
            const originalSrc = imgsPath + images[currentImg.dataset.nr];
            currentImg.src = currentImg.src.includes("default.gif") ? originalSrc : defaultImagePath;
        });
        imagesContainer.appendChild(imageEl);
    });
    imagesContainer.style.padding = "1rem";
});

// Mix images event
mixBtn.addEventListener("click", () => {
    const imageEls = document.querySelectorAll(".item");
    if (!imageEls.length) return;

    const mixedIndexes = mixImageIndexes();
    // Mix images
    imageEls.forEach((imageEl, i) => {
        imageEl.src = imgsPath + images[mixedIndexes[i]];
    });

    // Return images indexes ordered randomly
    function mixImageIndexes() {
        const indexes = new Set();

        // Generate index values in random manner and add to set until set length === total image count
        // Already generated values ignored, since set stores only unique values
        while (indexes.size !== imageEls.length) {
            indexes.add(Math.floor(Math.random() * images.length));
        }
        return Array.from(indexes);
    }
});

function isMobileDevice() {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/.test(userAgent);
}
