// Predefined image lists for each category
const hairFiles = ["long_hair_front_003.png", "long_hair_front_004.png", "long_hair_front_006.png", "long_hair_front_007.png", "long_hair_front_008.png", "long_hair_front_009.png", "long_hair_front_010.png", "long_hair_front_012.png", "long_hair_front_013.png", "long_hair_front_014.png", "long_hair_front_015.png", "long_hair_front_016.png", "long_hair_front_017.png", "long_hair_front_018.png", "long_hair_front_019.png", "long_hair_front_020.png"];
const hairBackFiles = Array.from({ length: 6 }, (_, i) => `long_hair_back_${String(i + 1).padStart(2, '0')}.png`);
const bodyFiles = Array.from({ length: 50 }, (_, i) => `${i + 1}.png`);
const overallFiles = Array.from({ length: 117 }, (_, i) => `overall_${String(i + 1).padStart(3, '0')}.png`);
const shoesFiles = Array.from({ length: 86 }, (_, i) => `shoes_${String(i + 1).padStart(3, '0')}.png`);
const botFiles = Array.from({ length: 123 }, (_, i) => `bot_${String(i + 1).padStart(3, '0')}.png`);
const topFiles = Array.from({ length: 138 }, (_, i) => `top_${String(i + 1).padStart(3, '0')}.png`);
const costumFiles = Array.from({ length: 19 }, (_, i) => `costum_${String(i + 1).padStart(3, '0')}.png`);

// Load images from a directory
async function loadImagesFromDirectory(directoryPath, filenames) {
    return await Promise.all(
        filenames.map(filename => new Promise((resolve, reject) => {
            const img = new Image();
            img.src = `${directoryPath}/${filename}`;
            img.onload = () => resolve(img);
            img.onerror = reject;
        }))
    );
}

// Load all images for each category
async function loadAndCombineImages() {
    const directories = {
        hairImages: ["assets/hair_front", hairFiles],
        hairBackImages: ["assets/hair_back", hairBackFiles],
        bodyImages: ["assets/body", bodyFiles],
        shoesImages: ["assets/shoes", shoesFiles],
        botImages: ["assets/bot", botFiles],
        topImages: ["assets/top", topFiles],
        overallImages: ["assets/overall", overallFiles],
        costumImages: ["assets/costum", costumFiles]
    };

    // Load each category and assign images to global variables
    for (const [key, [dir, files]] of Object.entries(directories)) {
        window[key] = await loadImagesFromDirectory(dir, files);
    }

    // Initial shuffle
    shuffleCharacterAssets();
}

// Shuffle function to get a random element from an array
function shuffleArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Update character images with random selections
function shuffleCharacterAssets() {
    document.querySelector('.hair_front').src = shuffleArray(hairImages).src;
    document.querySelector('.hair_back').src = shuffleArray(hairBackImages).src;
    document.querySelector('.character').src = shuffleArray(bodyImages).src;
    document.querySelector('.top').src = shuffleArray(topImages).src;
    document.querySelector('.bot').src = shuffleArray(botImages).src;
    document.querySelector('.shoes').src = shuffleArray(shoesImages).src;
    document.querySelector('.overall').src = shuffleArray(overallImages).src;
    document.querySelector('.costum').src = shuffleArray(costumImages).src;
}

// Show category images
function showCategoryImages(category) {
    const imageListContainer = document.getElementById("imageListContainer");
    imageListContainer.innerHTML = "";
    const directoryMap = {
        top: ["assets/top", topFiles],
        bot: ["assets/bot", botFiles],
        shoes: ["assets/shoes", shoesFiles],
        overall: ["assets/overall", overallFiles],
        costum: ["assets/costum", costumFiles]
    };

    const [directoryPath, imageFiles] = directoryMap[category] || [];
    if (!directoryPath || !imageFiles) return;

    imageFiles.forEach(file => {
        const img = new Image();
        img.src = `${directoryPath}/${file}`;
        img.className = "category-image";
        img.onclick = () => changeClothing(category, img.src);
        imageListContainer.appendChild(img);
    });
}

// Update the visible character component images
function updateVisibleComponents(category) {
    const components = {
        top: ["block", "block", "block", "none", "none"],
        bot: ["block", "block", "block", "none", "none"],
        shoes: ["block", "block", "block", "none", "none"],
        overall: ["none", "none", "block", "block", "none"],
        costum: ["none", "none", "none", "none", "block"]
    };
    const [topDisplay, botDisplay, shoesDisplay, overallDisplay, costumeDisplay] = components[category] || [];
    document.querySelector('.top').style.display = topDisplay || "block";
    document.querySelector('.bot').style.display = botDisplay || "block";
    document.querySelector('.shoes').style.display = shoesDisplay || "block";
    document.querySelector('.overall').style.display = overallDisplay || "none";
    document.querySelector('.costum').style.display = costumeDisplay || "none";
}

// Function to list current components in the canvas
function listCurrentComponents() {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    const components = [
        { selector: '.hair_front', name: 'Hair (Front)' },
        { selector: '.hair_back', name: 'Hair (Back)' },
        { selector: '.character', name: 'Body' },
        { selector: '.top', name: 'Top' },
        { selector: '.bot', name: 'Bottom' },
        { selector: '.shoes', name: 'Shoes' },
        { selector: '.overall', name: 'Overall' },
        { selector: '.costum', name: 'Costume' }
    ];
    components.forEach(({ selector, name }) => {
        const element = document.querySelector(selector);
        if (element && element.style.display !== "none" && element.src) {
            const wrapper = document.createElement("div");
            wrapper.className = "canvas-item-wrapper";
            wrapper.style.textAlign = "center";
            const label = document.createElement("span");
            label.innerText = name;
            wrapper.appendChild(label);
            const img = new Image();
            img.src = element.src;
            img.className = "canvas-item";
            img.draggable = true;
            wrapper.appendChild(img);
            canvas.appendChild(wrapper);
        }
    });
    initializeDraggableItems(canvas);
}

// Change clothing based on selected category and image source
function changeClothing(category, imgSrc) {
    const categoryMap = {
        top: '.top',
        bot: '.bot',
        shoes: '.shoes',
        overall: '.overall',
        costum: '.costum'
    };
    const selector = categoryMap[category];
    if (selector) {
        document.querySelector(selector).src = imgSrc;
    }
}

// Make components in the canvas draggable
function initializeDraggableItems(canvas) {
    const draggableItems = canvas.querySelectorAll(".canvas-item-wrapper");
    draggableItems.forEach(item => {
        item.style.position = "absolute";
        let isDragging = false, startX, startY, offsetX, offsetY;

        item.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            item.style.zIndex = 1000;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const canvasRect = canvas.getBoundingClientRect();
                const newX = e.clientX - canvasRect.left - offsetX;
                const newY = e.clientY - canvasRect.top - offsetY;
                item.style.left = `${Math.min(canvasRect.width - item.offsetWidth, Math.max(0, newX))}px`;
                item.style.top = `${Math.min(canvasRect.height - item.offsetHeight, Math.max(0, newY))}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            item.style.zIndex = "";
        });
    });
}

// Load initial images
document.addEventListener("DOMContentLoaded", () => loadAndCombineImages());



window.jsPDF = window.jspdf.jsPDF;

function Convert_HTML_To_PDF() {
    var doc = new jsPDF();
	
    // Source HTMLElement or a string containing HTML.
    var elementHTML = document.querySelector("#contentToPrint");

    doc.html(elementHTML, {
        callback: function(doc) {
            // Save the PDF
            doc.save('document-html.pdf');
        },
        margin: [10, 10, 10, 10],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: 1584, //target width in the PDF document
        windowWidth: 1584 //window width in CSS pixels
    });
}
