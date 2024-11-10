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
                try {
                    // 创建临时canvas
                    const tempCanvas = document.createElement('canvas');
                    const ctx = tempCanvas.getContext('2d');
                    tempCanvas.width = img.naturalWidth;
                    tempCanvas.height = img.naturalHeight;
                    
                    // 绘制图片
                    ctx.drawImage(img, 0, 0);
                    
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
                            // 检查像素是否不透明
                            if (data[idx + 3] > 0) {
                                minX = Math.min(minX, x);
                                minY = Math.min(minY, y);
                                maxX = Math.max(maxX, x);
                                maxY = Math.max(maxY, y);
                            }
                        }
                    }
                    
                    // 添加一点padding
                    const padding = 10;
                    minX = Math.max(0, minX - padding);
                    minY = Math.max(0, minY - padding);
                    maxX = Math.min(tempCanvas.width, maxX + padding);
                    maxY = Math.min(tempCanvas.height, maxY + padding);
                    
                    // 创建新的canvas来存储裁剪后的图片
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
                    
                    // 创建新图片元素
                    const croppedImg = new Image();
                    croppedImg.className = "canvas-item";
                    croppedImg.draggable = true;

                    // 保持头发的滤镜效果
                    if (component.selector.includes('hair')) {
                        const originalElement = document.querySelector(component.selector);
                        if (originalElement && originalElement.style.filter) {
                            croppedImg.style.filter = originalElement.style.filter;
                        }
                    }

                    // 将裁剪后的canvas转换为图片
                    croppedImg.src = croppedCanvas.toDataURL('image/png');

                    // 创建wrapper并添加到画布
                    const wrapper = document.createElement("div");
                    wrapper.className = "canvas-item-wrapper";
                    wrapper.style.position = "relative";
                    wrapper.style.cursor = "move";
                    wrapper.appendChild(croppedImg);
                    wrapper.addEventListener('mousedown', startDragging);
                    
                    canvas.appendChild(wrapper);
                    
                } catch (error) {
                    console.error('处理图片时出错:', error);
                    // 如果处理失败，使用原始图片
                    const wrapper = document.createElement("div");
                    wrapper.className = "canvas-item-wrapper";
                    wrapper.style.position = "relative";
                    wrapper.style.cursor = "move";
                    
                    const originalImg = new Image();
                    originalImg.className = "canvas-item";
                    originalImg.draggable = true;
                    originalImg.src = img.src;
                    
                    if (component.selector.includes('hair')) {
                        const originalElement = document.querySelector(component.selector);
                        if (originalElement && originalElement.style.filter) {
                            originalImg.style.filter = originalElement.style.filter;
                        }
                    }
                    
                    wrapper.appendChild(originalImg);
                    wrapper.addEventListener('mousedown', startDragging);
                    canvas.appendChild(wrapper);
                }
            };

            img.onerror = () => {
                console.error('加载图片失败:', img.src);
            };

            img.src = element.src;
        }
    });
}