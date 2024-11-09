

// Predefined image lists for each category
const hairFiles = ["long_hair_front_003.png", "long_hair_front_004.png", "long_hair_front_006.png","long_hair_front_007.png","long_hair_front_008.png","long_hair_front_009.png","long_hair_front_010.png","long_hair_front_012.png","long_hair_front_013.png","long_hair_front_014.png","long_hair_front_015.png","long_hair_front_016.png","long_hair_front_017.png","long_hair_front_018.png","long_hair_front_019.png","long_hair_front_020.png"];
const hairBackFiles = Array.from({ length: 6 }, (_, i) => `long_hair_back_${String(i + 1).padStart(2, '0')}.png`);
const bodyFiles = Array.from({ length: 50 }, (_, i) => `${i + 1}.png`);
const overallFiles = Array.from({ length: 117 }, (_, i) => `overall_${String(i + 1).padStart(3, '0')}.png`);
const shoesFiles = Array.from({ length: 86 }, (_, i) => `shoes_${String(i + 1).padStart(3, '0')}.png`);
const botFiles = Array.from({ length: 123 }, (_, i) => `bot_${String(i + 1).padStart(3, '0')}.png`);
const topFiles = Array.from({ length: 138 }, (_, i) => `top_${String(i + 1).padStart(3, '0')}.png`);
const costumFiles = Array.from({ length: 19 }, (_, i) => `costum_${String(i + 1).padStart(3, '0')}.png`);




// Global variables to store the images after they are loaded
//let hairImages, hairBackImages, bodyImages, overallImages, shoesImages,topImages,botImages,costumImages;

// Function to load images from a directory
async function loadImagesFromDirectory(directoryPath, filenames) {
    return await Promise.all(
        filenames.map(filename => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = `${directoryPath}/${filename}`;
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
        })
    );
}

// Load and combine all images
async function loadAndCombineImages() {
    // Define directories (adjust paths as needed)
    const hairDirectory = "assets/hair_front";
    const hairBackDirectory = "assets/hair_back";
    const bodyDirectory = "assets/body";
   
    const shoesDirectory = "assets/shoes";
    const botDirectory = "assets/bot";
    const topDirectory = "assets/top"
    const overallDirectory = "assets/overall"
    const costumDirectory = "assets/costum"

    // Load images from each category
    hairImages = await loadImagesFromDirectory(hairDirectory, hairFiles);
    hairBackImages = await loadImagesFromDirectory(hairBackDirectory, hairBackFiles);
    bodyImages = await loadImagesFromDirectory(bodyDirectory, bodyFiles);
    overallImages = await loadImagesFromDirectory(overallDirectory, overallFiles);
    shoesImages = await loadImagesFromDirectory(shoesDirectory, shoesFiles);
    botImages = await loadImagesFromDirectory(botDirectory,botFiles);
    topImages = await loadImagesFromDirectory(topDirectory,topFiles);
    costumImages = await loadImagesFromDirectory(costumDirectory,costumFiles);


    // Initial shuffle to apply images to the page
    shuffleCharacterAssets();
}

// Shuffle function that takes an array and returns a random element
function shuffleArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to update character images with shuffled random images
function shuffleCharacterAssets() {
    // Shuffle each category and get a random image
    const selectedHair = shuffleArray(hairImages);
    const selectedHairBack = shuffleArray(hairBackImages);
    const selectedBody = shuffleArray(bodyImages);
    const selectedOverall = shuffleArray(overallImages);
    const selectedShoes = shuffleArray(shoesImages);
    const selectedTop = shuffleArray(topImages);
    const selectedBot = shuffleArray(botImages);
    const selectedCostum = shuffleArray(costumImages);

    // Update the image sources with the selected random images
    document.querySelector('.hair_front').src = selectedHair.src;
    document.querySelector('.hair_back').src = selectedHairBack.src;
    document.querySelector('.character').src = selectedBody.src;
   document.querySelector('.top').src = selectedTop.src;
   document.querySelector('.bot').src = selectedBot.src;
   document.querySelector('.shoes').src = selectedShoes.src;
   document.querySelector('.overall').src = selectedOverall.src;
    document.querySelector('.costum').src = selectedCostum.src;
}






// Event listener to trigger the shuffle when the user clicks anywhere on the page
//document.addEventListener('click', shuffleCharacterAssets);



// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {

    // Container where images will be displayed
const imageListContainer = document.getElementById("imageListContainer");


    document.getElementById("shuffle_button").addEventListener("click", shuffleCharacterAssets);

    document.getElementById("top_button").addEventListener("click", () => {
        showCategoryImages("top");
        updateVisibleComponents("top");
    });
    document.getElementById("bot_button").addEventListener("click", () => {
        showCategoryImages("bot");
        updateVisibleComponents("bot");
    });
    document.getElementById("shoes_button").addEventListener("click", () => {
        showCategoryImages("shoes");
        updateVisibleComponents("shoes");
    });
    document.getElementById("overall_button").addEventListener("click", () => {
        showCategoryImages("overall");
        updateVisibleComponents("overall");
    });
    document.getElementById("costum_button").addEventListener("click", () => {
        showCategoryImages("costum");
        updateVisibleComponents("costum");
    });


// Function to control the visibility of character components
function updateVisibleComponents(category) {
    const top = document.querySelector('.top');
    const bot = document.querySelector('.bot');
    const shoes = document.querySelector('.shoes');
    const overall = document.querySelector('.overall');
    const costume = document.querySelector('.costum');

    switch (category) {
        case "costum":
            top.style.display = "none";
            bot.style.display = "none";
            shoes.style.display = "none";
            overall.style.display = "none";
            costume.style.display = "block";
            break;
        case "overall":
            top.style.display = "none";
            bot.style.display = "none";
            costume.style.display = "none";
            overall.style.display = "block";
            shoes.style.display = "block"; // Shoes are still visible with overall
            break;
        case "top":
        case "bot":
            overall.style.display = "none";
            costume.style.display = "none";
            top.style.display = "block";
            bot.style.display = "block";
            shoes.style.display = "block"; // Shoes are still visible with top or bot
            break;
        case "shoes":
            // Shoes category does not affect visibility of other items
            top.style.display = "block";
            bot.style.display = "block";
            overall.style.display = "block";
            costume.style.display = "none";
            break;
        default:
            // Reset visibility for any other case
            top.style.display = "block";
            bot.style.display = "block";
            shoes.style.display = "block";
            overall.style.display = "none";
            costume.style.display = "none";
    }
}


    function showCategoryImages(category) {
        imageListContainer.innerHTML = ""; // Clear previous images
    
        // Determine which array of files to use based on category
        let imageFiles;
        let directoryPath;
        switch (category) {
            case "top":
                imageFiles = topFiles;  // Assuming 'pieceFiles' holds 'top' files
                directoryPath = "assets/top";
                break;
            case "bot":
                imageFiles = botFiles;
                directoryPath = "assets/bot";
                break;
            case "shoes":
                imageFiles = shoesFiles;
                directoryPath = "assets/shoes";
                break;
            case "overall":
                imageFiles = overallFiles; // Using overall pieces from 'pieceFiles'
                directoryPath = "assets/overall";
                break;
            case "costum":
                imageFiles = costumFiles;  // Assuming 'costum' refers to hair components
                directoryPath = "assets/costum";
                break;
            default:
                return;
        }
    
        // Generate and append images to the container
        imageFiles.forEach((file) => {
            const img = new Image();
            img.src = `${directoryPath}/${file}`;
            img.className = "category-image"; // Optional: add a class for styling
            img.onclick = () => changeClothing(category, img.src); // Add click event to change clothing
            imageListContainer.appendChild(img);
        });
    }
    
    
    
 // Function to change the displayed clothing based on selected item
 function changeClothing(category, imgSrc) {
    switch (category) {
        case "top":
            document.querySelector('.top').src = imgSrc;
            break;
        case "bot":
            document.querySelector('.bot').src = imgSrc;
            break;
        case "shoes":
            document.querySelector('.shoes').src = imgSrc;
            break;
        case "overall":
            document.querySelector('.overall').src = imgSrc;
            
            break;
        case "costum":
            document.querySelector('.costum').src = imgSrc;
            
            break;
        default:
            console.error("Unknown category:", category);
    }
}



    
    // Load initial images
   // loadAndCombineImages();

});

