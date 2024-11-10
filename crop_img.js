// 裁剪图片函数
function cropImageToContent(sourceImg) {
    // 创建临时canvas
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    tempCanvas.width = sourceImg.naturalWidth;
    tempCanvas.height = sourceImg.naturalHeight;
    
    // 绘制原始图片
    ctx.drawImage(sourceImg, 0, 0);
    
    try {
        // 获取图片数据
        const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        // 找到有像素的边界
        let minX = tempCanvas.width;
        let minY = tempCanvas.height;
        let maxX = 0;
        let maxY = 0;
        
        // 扫描所有像素
        for (let y = 0; y < tempCanvas.height; y++) {
            for (let x = 0; x < tempCanvas.width; x++) {
                const idx = (y * tempCanvas.width + x) * 4;
                if (data[idx + 3] > 0) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }
        
        // 创建新的canvas
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        croppedCanvas.width = maxX - minX;
        croppedCanvas.height = maxY - minY;
        
        // 绘制裁剪后的图片
        croppedCtx.drawImage(
            tempCanvas, 
            minX, minY, 
            maxX - minX, maxY - minY, 
            0, 0, 
            maxX - minX, maxY - minY
        );
        
        return croppedCanvas.toDataURL('image/png');
    } catch (error) {
        console.error('裁剪图片失败:', error);
        return sourceImg.src;
    }
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

    components.forEach(component => {
        const element = document.querySelector(component.selector);
        
        if (element && element.style.display !== "none" && element.src) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            
            img.onload = () => {
                // 获取裁剪后的图片数据
                const croppedSrc = cropImageToContent(img);
                
                // 创建新的图片元素
                const croppedImg = new Image();
                croppedImg.className = "canvas-item";
                croppedImg.draggable = true;

                // 如果是头发元素，复制原始元素的滤镜效果
                if (component.selector.includes('hair')) {
                    const originalElement = document.querySelector(component.selector);
                    if (originalElement && originalElement.style.filter) {
                        croppedImg.style.filter = originalElement.style.filter;
                    }
                }

                // 创建wrapper
                const wrapper = document.createElement("div");
                wrapper.className = "canvas-item-wrapper";
                wrapper.style.position = "relative";
                wrapper.style.cursor = "move";
                
                // 当裁剪后的图片加载完成时添加到wrapper
                croppedImg.onload = () => {
                    wrapper.appendChild(croppedImg);
                    wrapper.addEventListener('mousedown', startDragging);
                    canvas.appendChild(wrapper);
                };
                
                // 设置裁剪后的图片源
                croppedImg.src = croppedSrc;
            };

            img.onerror = () => {
                console.error('加载图片失败:', img.src);
            };

            img.src = element.src;
        }
    });
}





function testCropImage(imageUrl) {
    const testImg = new Image();
    testImg.crossOrigin = "anonymous";
    
    testImg.onload = () => {
        // 创建一个临时的显示区域
        const testDiv = document.createElement('div');
        testDiv.style.position = 'fixed';
        testDiv.style.top = '10px';
        testDiv.style.right = '10px';
        testDiv.style.backgroundColor = '#fff';
        testDiv.style.padding = '10px';
        testDiv.style.border = '1px solid #000';
        testDiv.style.zIndex = '9999';
        
        // 显示原始图片
        const originalTitle = document.createElement('div');
        originalTitle.textContent = '原始图片：';
        testDiv.appendChild(originalTitle);
        testDiv.appendChild(testImg.cloneNode());
        
        // 显示裁剪后的图片
        const croppedTitle = document.createElement('div');
        croppedTitle.textContent = '裁剪后：';
        testDiv.appendChild(croppedTitle);
        
        const croppedSrc = cropImageToContent(testImg);
        const croppedImg = new Image();
        croppedImg.src = croppedSrc;
        testDiv.appendChild(croppedImg);
        
        // 添加关闭按钮
        const closeButton = document.createElement('button');
        closeButton.textContent = '关闭';
        closeButton.onclick = () => document.body.removeChild(testDiv);
        testDiv.appendChild(closeButton);
        
        document.body.appendChild(testDiv);
    };
    
    testImg.onerror = () => {
        console.error('测试图片加载失败');
    };
    
    testImg.src = imageUrl;
}

// 方法2：创建测试页面
function createTestPage() {
    // 清空当前页面
    document.body.innerHTML = '';
    
    // 创建测试界面
    const container = document.createElement('div');
    container.innerHTML = `
        <div style="padding: 20px;">
            <h2>图片裁剪测试</h2>
            <div style="margin-bottom: 20px;">
                <input type="file" id="imageInput" accept="image/*">
            </div>
            <div style="display: flex; gap: 20px;">
                <div>
                    <h3>原始图片</h3>
                    <img id="originalImage" style="max-width: 300px;">
                </div>
                <div>
                    <h3>裁剪后图片</h3>
                    <img id="croppedImage" style="max-width: 300px;">
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);
    
    // 添加文件选择监听
    document.getElementById('imageInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // 显示原始图片
                    document.getElementById('originalImage').src = img.src;
                    
                    // 显示裁剪后的图片
                    const croppedSrc = cropImageToContent(img);
                    document.getElementById('croppedImage').src = croppedSrc;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
