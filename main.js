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

document.getElementById("shuffle_button").addEventListener("click", () => {
    shuffleCharacterAssets();
   // listCurrentComponents();
});
   

document.getElementById("generate_button").addEventListener("click", () => {
   
    listCurrentComponents();
});
   

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
    
        function trimSingleImage(img) {
            return new Promise((resolve, reject) => {
                try {
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    // 设置canvas尺寸
                    tempCanvas.width = img.naturalWidth || img.width;
                    tempCanvas.height = img.naturalHeight || img.height;
    
                    // 尝试绘制图片
                    try {
                        tempCtx.drawImage(img, 0, 0);
                        // 尝试获取像素数据 - 如果这里失败，说明canvas被污染
                        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                    } catch (e) {
                        console.warn('Canvas may be tainted, returning original image:', e);
                        resolve(img);
                        return;
                    }
    
                    // 获取像素数据
                    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                    const pixels = imageData.data;
                    let bound = {
                        top: tempCanvas.height,
                        left: tempCanvas.width,
                        right: 0,
                        bottom: 0
                    };
    
                    // 扫描像素找到边界
                    for(let y = 0; y < tempCanvas.height; y++) {
                        for(let x = 0; x < tempCanvas.width; x++) {
                            const idx = (y * tempCanvas.width + x) * 4;
                            const alpha = pixels[idx + 3];
                            
                            if(alpha > 0) {
                                bound.top = Math.min(bound.top, y);
                                bound.left = Math.min(bound.left, x);
                                bound.right = Math.max(bound.right, x);
                                bound.bottom = Math.max(bound.bottom, y);
                            }
                        }
                    }
    
                    // 检查是否找到有效边界
                    if(bound.top <= bound.bottom && bound.left <= bound.right) {
                        const padding = 10;
                        const width = (bound.right - bound.left + 1) + (padding * 2);
                        const height = (bound.bottom - bound.top + 1) + (padding * 2);
    
                        const finalCanvas = document.createElement('canvas');
                        const finalCtx = finalCanvas.getContext('2d');
                        finalCanvas.width = width;
                        finalCanvas.height = height;
    
                        finalCtx.drawImage(
                            tempCanvas,
                            bound.left - padding,
                            bound.top - padding,
                            width,
                            height,
                            0,
                            0,
                            width,
                            height
                        );
    
                        // 直接返回 canvas 元素而不是转换为图片
                        resolve(finalCanvas);
                    } else {
                        resolve(img);
                    }
                } catch (error) {
                    console.error('Error in trimSingleImage:', error);
                    resolve(img);
                }
            });
        }
    
        // 处理每个组件
        components.forEach(component => {
            const element = document.querySelector(component.selector);
            
            if (element && element.style.display !== "none" && element.src) {
                const img = new Image();
                img.crossOrigin = "anonymous";  // 添加跨域支持
                
                img.onload = async () => {
                    try {
                        const result = await trimSingleImage(img);
                        const wrapper = document.createElement("div");
                        wrapper.className = "canvas-item-wrapper";
                        wrapper.style.position = "relative";
                        wrapper.style.cursor = "move";
                        
                        if (result instanceof HTMLCanvasElement) {
                            // 如果返回的是 canvas，直接使用它
                            result.className = "canvas-item";
                            result.draggable = true;
                            wrapper.appendChild(result);
                        } else {
                            // 如果返回的是原始图片，使用它
                            result.className = "canvas-item";
                            result.draggable = true;
                            wrapper.appendChild(result);
                        }
                        
                        wrapper.addEventListener('mousedown', startDragging);
                        canvas.appendChild(wrapper);
                    } catch (error) {
                        console.error('Error processing image:', error);
                    }
                };
    
                // 添加时间戳避免缓存
                const timestamp = new Date().getTime();
                img.src = `${element.src}${element.src.includes('?') ? '&' : '?'}_t=${timestamp}`;
            }
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
// List current components after any selection
  // listCurrentComponents();
}



// Load initial images
loadAndCombineImages();


    
});



function startDragging(e) {
    const wrapper = e.currentTarget;
    const initialX = e.clientX - wrapper.offsetLeft;
    const initialY = e.clientY - wrapper.offsetTop;
    
    function drag(e) {
        wrapper.style.position = "absolute";
        wrapper.style.left = `${e.clientX - initialX}px`;
        wrapper.style.top = `${e.clientY - initialY}px`;
    }
    
    function stopDragging() {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDragging);
    }
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
}



// 确保每个canvas-item-wrapper都有唯一的ID
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.canvas-item-wrapper');
    items.forEach((item, index) => {
        if (!item.dataset.id) {
            item.dataset.id = `item-${index}`;
        }
    });
});

// 添加新按钮到界面
document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.querySelector('.button-container') || document.querySelector('.element-wrapper');
    
    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-design-btn';
    downloadButton.innerHTML = `
        <span class="btn-text">下载设计图</span>
        <span class="loading-spinner" style="display: none;">
            <i class="fas fa-spinner fa-spin"></i>
        </span>
    `;
    
    buttonContainer.appendChild(downloadButton);
    downloadButton.addEventListener('click', handleDownloadImage);
});

// 下载图片的处理函数
async function handleDownloadImage() {
    const button = document.querySelector('.download-design-btn');
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.loading-spinner');
    const canvas = document.getElementById('canvas');

    try {
        // 显示加载状态
        button.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';

        // 1. 首先克隆canvas区域
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';
        document.body.appendChild(tempDiv);

        const canvasClone = canvas.cloneNode(true);
        tempDiv.appendChild(canvasClone);

        // 2. 处理克隆区域中的所有图片
        const images = canvasClone.querySelectorAll('img');
        await Promise.all([...images].map(img => 
            new Promise((resolve, reject) => {
                const newImg = new Image();
                newImg.crossOrigin = 'anonymous';

                newImg.onload = () => {
                    // 创建临时canvas来转换图片
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = newImg.width;
                    tempCanvas.height = newImg.height;
                    const ctx = tempCanvas.getContext('2d');
                    ctx.drawImage(newImg, 0, 0);
                    
                    // 将图片转换为base64并替换原始src
                    try {
                        const base64 = tempCanvas.toDataURL('image/png');
                        img.src = base64;
                        resolve();
                    } catch (e) {
                        // 如果转换失败，保留原始图片
                        resolve();
                    }
                };

                newImg.onerror = () => {
                    // 如果加载失败，保留原始图片
                    resolve();
                };

                // 添加时间戳避免缓存
                const timestamp = new Date().getTime();
                newImg.src = `${img.src}${img.src.includes('?') ? '&' : '?'}_t=${timestamp}`;
            })
        ));

        // 3. 使用html2canvas捕获处理后的区域
        const capturedCanvas = await html2canvas(canvasClone, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            scale: 2,
            logging: true,
            onclone: function(clonedDoc) {
                const clonedImages = clonedDoc.querySelectorAll('img');
                clonedImages.forEach(img => {
                    img.crossOrigin = 'anonymous';
                });
            }
        });

        // 4. 创建下载链接
        const link = document.createElement('a');
        link.download = 'chibi-design.png';
        
        // 尝试直接转换为blob url
        capturedCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 'image/png');

        // 5. 清理临时元素
        document.body.removeChild(tempDiv);

    } catch (error) {
        console.error('图片生成错误:', error);
        alert('生成图片时发生错误，请重试');
    } finally {
        // 恢复按钮状态
        button.disabled = false;
        btnText.style.display = 'inline-block';
        spinner.style.display = 'none';
    }
}

