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
    const hairDirectory = "assets/chibidoll/hair_front";
    const hairBackDirectory = "assets/chibidoll/hair_back";
    const bodyDirectory = "assets/chibidoll/body";
   
    const shoesDirectory = "assets/chibidoll/shoes";
    const botDirectory = "assets/chibidoll/bot";
    const topDirectory = "assets/chibidoll/top"
    const overallDirectory = "assets/chibidoll/overall"
    const costumDirectory = "assets/chibidoll/costum"

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
    



/*------------------------ listCurrentComponents Start--------------------------*/
/*

    function listCurrentComponents() {
        const canvas = document.getElementById("canvas");
      
        
        // 清空画布
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
    
        components.forEach(component => {
            const element = document.querySelector(component.selector);
            
            if (element && element.style.display !== "none" && element.src) {
                const img = new Image();
                
                img.onload = () => {
                    const wrapper = document.createElement("div");
                    wrapper.className = "canvas-item-wrapper";
                    wrapper.style.position = "relative";
                    wrapper.style.cursor = "move";
                    
                    img.className = "canvas-item";
                    img.draggable = true;
    
                    // 如果是头发元素，复制原始元素的滤镜效果
                    if (component.selector.includes('hair')) {
                        const originalElement = document.querySelector(component.selector);
                        if (originalElement && originalElement.style.filter) {
                            img.style.filter = originalElement.style.filter;
                        }
                    }
    
                    wrapper.appendChild(img);
                    wrapper.addEventListener('mousedown', startDragging);
                   
                    
                    canvas.appendChild(wrapper);
                };
    
                img.src = element.src;
            }
        });
    }
*/

/*------------------------ listCurrentComponents End --------------------------*/




    
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












/*------------handleDownloadImage ---------------------*/


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

        // 创建一个新的canvas
        const finalCanvas = document.createElement('canvas');
        const ctx = finalCanvas.getContext('2d');

        // 设置canvas尺寸
        finalCanvas.width = canvas.offsetWidth;
        finalCanvas.height = canvas.offsetHeight;

        // 设置白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

        // 获取所有图片元素
        const items = canvas.querySelectorAll('.canvas-item-wrapper');
        
        // 创建一个Promise数组来处理所有图片
        const drawPromises = Array.from(items).map(wrapper => {
            return new Promise((resolve) => {
                const img = wrapper.querySelector('img');
                if (!img) {
                    resolve();
                    return;
                }

                // 获取位置信息
                const rect = wrapper.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                const x = rect.left - canvasRect.left;
                const y = rect.top - canvasRect.top;

                // 如果是头发图片
                if (img.src.includes('hair_')) {
                    // 创建临时canvas
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    // 加载原始图片
                    const originalImg = new Image();
                    originalImg.crossOrigin = 'anonymous';
                    originalImg.onload = () => {
                        tempCanvas.width = img.width;
                        tempCanvas.height = img.height;
                        
                        // 应用滤镜
                        tempCtx.filter = img.style.filter;
                        tempCtx.drawImage(originalImg, 0, 0, img.width, img.height);
                        
                        // 绘制到最终canvas
                        ctx.drawImage(tempCanvas, x, y, img.width, img.height);
                        resolve();
                    };
                    originalImg.src = img.src;
                } else {
                    // 非头发图片直接绘制
                    const newImg = new Image();
                    newImg.crossOrigin = 'anonymous';
                    newImg.onload = () => {
                        ctx.drawImage(newImg, x, y, img.width, img.height);
                        resolve();
                    };
                    newImg.src = img.src;
                }
            });
        });

        // 等待所有图片绘制完成
        await Promise.all(drawPromises);

        // 创建下载链接
        const link = document.createElement('a');
        link.download = 'chibi-design.png';
        
        // 转换为blob并下载
        finalCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');

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









/*
// ... existing code ...

document.addEventListener("DOMContentLoaded", () => {
    // 添加在现有的事件监听器内部
    document.getElementById("applyHairColor").addEventListener("click", () => {
        const color = document.getElementById("hairColorPicker").value;
        applyHairColor(color);
    });
    
    // ... existing event listeners ...
});

// 添加新函数用于改变头发颜色
function applyHairColor(color) {
    const hairFront = document.querySelector('.hair_front');
    const hairBack = document.querySelector('.hair_back');
    
    // 创建临时canvas来处理前发
    const tempCanvasFront = document.createElement('canvas');
    const tempCanvasBack = document.createElement('canvas');
    
    // 处理前发
    colorizeImage(hairFront, tempCanvasFront, color);
    
    // 处理后发
    colorizeImage(hairBack, tempCanvasBack, color);
}

function colorizeImage(imgElement, canvas, color) {
    if (!imgElement.complete || !imgElement.src) return;
    
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 绘制原始图片
        ctx.drawImage(img, 0, 0);
        
        // 获取图片数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 转换颜色从十六进制到RGB
        const r = parseInt(color.substr(1,2), 16);
        const g = parseInt(color.substr(3,2), 16);
        const b = parseInt(color.substr(5,2), 16);
        
        // 处理每个像素
        for (let i = 0; i < data.length; i += 4) {
            // 如果像素不是完全透明的
            if (data[i + 3] > 0) {
                // 保持原始亮度
                const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255;
                
                // 应用新颜色，保持原始亮度
                data[i] = r * brightness;     // Red
                data[i + 1] = g * brightness; // Green
                data[i + 2] = b * brightness; // Blue
                // Alpha通道保持不变
            }
        }
        
        // 将处理后的图片数据放回canvas
        ctx.putImageData(imageData, 0, 0);
        
        // 更新原始图片源
        imgElement.src = canvas.toDataURL('image/png');
    };
    
    // 添加时间戳避免缓存
    const timestamp = new Date().getTime();
    img.src = `${imgElement.src}${imgElement.src.includes('?') ? '&' : '?'}_t=${timestamp}`;
}

// ... existing code ...

*/



// 将事件处理函数单独定义
function handleColorChange() {
    const color = document.getElementById("hairColorPicker").value;
    const hairFront = document.querySelector('.hair_front');
    const hairBack = document.querySelector('.hair_back');
    
    applyColorFilter(hairFront, color);
    applyColorFilter(hairBack, color);

        // 更新 canvas 中的头发
        const canvasHairFront = document.querySelector('#canvas .canvas-item-wrapper img[src*="hair_front"]');
        const canvasHairBack = document.querySelector('#canvas .canvas-item-wrapper img[src*="hair_back"]');
        
        if (canvasHairFront) {
            applyColorFilter(canvasHairFront, color);
        }
        if (canvasHairBack) {
            applyColorFilter(canvasHairBack, color);
        }
}

document.addEventListener("DOMContentLoaded", () => {
    const applyButton = document.getElementById("applyHairColor");
    // 移除旧的事件监听器（如果存在）并添加新的
    applyButton.removeEventListener("click", handleColorChange);
    applyButton.addEventListener("click", handleColorChange);
});

function applyColorFilter(element, color) {
    if (!element) return;
    
    // 移除之前的所有滤镜
    element.style.removeProperty('filter');
    
    // 移除旧的SVG滤镜（如果存在）
    const oldFilter = document.getElementById('recolor');
    if (oldFilter) {
        oldFilter.remove();
    }
    
    // 创建新的唯一ID
    const filterId = `recolor_${new Date().getTime()}`;
    
    // 创建颜色矩阵滤镜
    const svg = `
        <svg style="display:none;">
            <defs>
                <filter id="${filterId}">
                    <feColorMatrix
                        type="matrix"
                        values="${createColorMatrix(color)}"
                    />
                </filter>
            </defs>
        </svg>
    `;
    
    // 添加新的SVG到文档中
    document.body.insertAdjacentHTML('beforeend', svg);
    
    // 应用新的滤镜
    element.style.filter = `url(#${filterId})`;
}

function createColorMatrix(hexColor) {
    // 将十六进制颜色转换为RGB
    const r = parseInt(hexColor.substr(1,2), 16) / 255;
    const g = parseInt(hexColor.substr(3,2), 16) / 255;
    const b = parseInt(hexColor.substr(5,2), 16) / 255;
    
    // 颜色矩阵
    return `
        ${r} 0 0 0 0
        0 ${g} 0 0 0
        0 0 ${b} 0 0
        0 0 0 1 0
    `.trim().replace(/\n/g, ' ');
}


