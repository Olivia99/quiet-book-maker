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
        canvas.innerHTML = ""; // Clear previous list
    
        // Array of component selectors
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
    
        // Loop through components and add each visible one to the canvas
        components.forEach(component => {
            const element = document.querySelector(component.selector);
            
            if (element && element.style.display !== "none" && element.src) {
                const img = new Image();
                img.src = element.src;
                img.className = "canvas-item"; // Apply styles for display
                img.draggable = true;
                img.alt = component.name; // Optional: for accessibility
                
                // Create a wrapper with label for the component
                const wrapper = document.createElement("div");
                wrapper.className = "canvas-item-wrapper";
                wrapper.style.position = "relative"; // 添加相对定位
                wrapper.style.cursor = "move"; // 添加移动光标样式
                
                // 添加拖拽事件监听器
                wrapper.addEventListener('mousedown', startDragging);
                wrapper.appendChild(img);
                canvas.appendChild(wrapper);
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

// 添加新函数用于生成和下载PDF
async function generateAndDownloadPDF() {
    const canvas = document.getElementById('canvas');
    
    // US Letter 尺寸（landscape方向）
    const US_LETTER = {
        width: 11 * 96,   // 1056 pixels
        height: 8.5 * 96  // 816 pixels
    };
    
    try {
        // 创建一个临时容器来保持布局
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        document.body.appendChild(tempContainer);
        
        // 克隆canvas及其内容
        const canvasClone = canvas.cloneNode(true);
        tempContainer.appendChild(canvasClone);
        
        // 保存原始尺寸
        const originalWidth = canvas.offsetWidth;
        const originalHeight = canvas.offsetHeight;
        
        // 计算缩放比例
        const scale = Math.min(
            US_LETTER.width / originalWidth,
            US_LETTER.height / originalHeight
        );
        
        // 计算缩放后的尺寸
        const scaledWidth = originalWidth * scale;
        const scaledHeight = originalHeight * scale;
        
        // 设置克隆容器的样式
        canvasClone.style.width = `${scaledWidth}px`;
        canvasClone.style.height = `${scaledHeight}px`;
        canvasClone.style.position = 'relative';
        canvasClone.style.backgroundColor = '#ffffff';
        
        // 调整克隆元素中所有项目的大小和位置
        const clonedItems = canvasClone.querySelectorAll('.canvas-item-wrapper');
        clonedItems.forEach(item => {
            const originalItem = canvas.querySelector(`[data-id="${item.dataset.id}"]`);
            if (!originalItem) return;
            
            const rect = originalItem.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();
            
            // 计算相对位置
            const relativeLeft = (rect.left - canvasRect.left) / originalWidth;
            const relativeTop = (rect.top - canvasRect.top) / originalHeight;
            
            // 应用缩放后的位置和尺寸
            item.style.position = 'absolute';
            item.style.left = `${relativeLeft * scaledWidth}px`;
            item.style.top = `${relativeTop * scaledHeight}px`;
            item.style.width = `${(rect.width / originalWidth) * scaledWidth}px`;
            item.style.height = `${(rect.height / originalHeight) * scaledHeight}px`;
            
            // 确保图片填充其容器
            const img = item.querySelector('img');
            if (img) {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';
            }
        });
        
        // 等待图片加载
        await Promise.all(Array.from(canvasClone.querySelectorAll('img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }));
        
        // 使用html2canvas捕获克隆的内容
        const capturedCanvas = await html2canvas(canvasClone, {
            allowTaint: true,
            useCORS: true,
            logging: true,
            backgroundColor: '#ffffff',
            scale: 2, // 提高输出质量
            width: scaledWidth,
            height: scaledHeight,
            onclone: function(clonedDoc) {
                const clonedElement = clonedDoc.querySelector('#canvas');
                clonedElement.style.transform = 'none';
            }
        });
        
        // 创建PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'in',
            format: 'letter'
        });
        
        // 计算居中位置
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const xOffset = (pdfWidth - (scaledWidth / 96)) / 2;
        const yOffset = (pdfHeight - (scaledHeight / 96)) / 2;
        
        // 将捕获的内容添加到PDF
        const imgData = capturedCanvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 
            xOffset, yOffset, 
            scaledWidth / 96,
            scaledHeight / 96
        );
        
        // 下载PDF
        pdf.save('chibi-doll-design.pdf');
        
        // 清理临时元素
        document.body.removeChild(tempContainer);
        
    } catch (error) {
        console.error('PDF生成错误:', error);
        alert('生成PDF时发生错误，请重试');
    }
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
    downloadButton.className = 'download-pdf-btn';
    downloadButton.innerHTML = `
        <span class="btn-text">下载设计图</span>
        <span class="loading-spinner" style="display: none;">
            <i class="fas fa-spinner fa-spin"></i>
        </span>
    `;
    
    buttonContainer.appendChild(downloadButton);
    downloadButton.addEventListener('click', handleDownloadPDF);
});

// 下载PDF的处理函数
async function handleDownloadPDF() {
    const button = document.querySelector('.download-pdf-btn');
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.loading-spinner');
    const canvas = document.getElementById('canvas');

    try {
        // 显示加载状态
        button.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';

        // 1. 首先处理所有图片的跨域问题
        const images = canvas.querySelectorAll('img');
        await Promise.all([...images].map(img => {
            return new Promise((resolve, reject) => {
                const newImg = new Image();
                newImg.crossOrigin = 'anonymous';  // 关键：添加跨域属性
                
                newImg.onload = () => {
                    // 替换原始图片
                    img.src = newImg.src;
                    resolve();
                };
                
                newImg.onerror = () => {
                    // 如果跨域加载失败，尝试添加代理或时间戳
                    const timestamp = new Date().getTime();
                    newImg.src = `${img.src}${img.src.includes('?') ? '&' : '?'}timestamp=${timestamp}`;
                };

                // 设置原始图片源
                newImg.src = img.src;
            });
        }));

        // 2. 创建临时容器
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '0';
        tempDiv.style.top = '0';
        tempDiv.style.width = `${11 * 96}px`;
        tempDiv.style.height = `${8.5 * 96}px`;
        tempDiv.style.backgroundColor = '#ffffff';
        document.body.appendChild(tempDiv);

        // 3. 克隆和调整canvas
        const canvasClone = canvas.cloneNode(true);
        tempDiv.appendChild(canvasClone);

        const originalWidth = canvas.offsetWidth;
        const originalHeight = canvas.offsetHeight;
        const targetWidth = 11 * 96;
        const targetHeight = 8.5 * 96;
        const scale = Math.min(targetWidth / originalWidth, targetHeight / originalHeight);

        canvasClone.style.transform = `scale(${scale})`;
        canvasClone.style.transformOrigin = 'top left';
        canvasClone.style.width = `${originalWidth}px`;
        canvasClone.style.height = `${originalHeight}px`;

        // 4. 使用html2canvas
        const capturedCanvas = await html2canvas(canvasClone, {
            allowTaint: false,  // 不允许污染
            useCORS: true,     // 使用CORS
            logging: false,
            backgroundColor: '#ffffff',
            scale: 2,
            width: targetWidth,
            height: targetHeight,
            imageTimeout: 0,    // 禁用超时
            onclone: function(clonedDoc) {
                // 确保克隆的文档中的图片也是跨域的
                const clonedImages = clonedDoc.querySelectorAll('img');
                clonedImages.forEach(img => {
                    img.crossOrigin = 'anonymous';
                });
            }
        });

        // 5. 创建PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'letter'
        });

        const imgData = capturedCanvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, targetWidth, targetHeight);
        pdf.save('chibi-design.pdf');

    } catch (error) {
        console.error('详细错误信息:', error);
        alert(`生成PDF时发生错误: ${error.message}`);
    } finally {
        const tempDiv = document.querySelector('#temp-canvas-container');
        if (tempDiv) {
            document.body.removeChild(tempDiv);
        }
        button.disabled = false;
        btnText.style.display = 'inline-block';
        spinner.style.display = 'none';
    }
}
