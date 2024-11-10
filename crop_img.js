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
            
            img.onload = () => {
                // 创建临时canvas来处理alpha遮罩
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;

                // 绘制原始图片
                tempCtx.drawImage(img, 0, 0);

                // 获取图片数据
                const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                const data = imageData.data;

                // 创建alpha遮罩
                for (let i = 0; i < data.length; i += 4) {
                    const alpha = data[i + 3];
                    // 将透明区域设为黑色，不透明区域设为白色
                    data[i] = data[i + 1] = data[i + 2] = alpha;
                    data[i + 3] = 255; // 设置完全不透明
                }

                // 将处理后的数据放回canvas
                tempCtx.putImageData(imageData, 0, 0);

                // 找到不透明区域的边界
                const bounds = findImageBounds(imageData, tempCanvas.width);

                // 创建最终的裁剪canvas
                const croppedCanvas = document.createElement('canvas');
                const croppedCtx = croppedCanvas.getContext('2d');
                croppedCanvas.width = bounds.width;
                croppedCanvas.height = bounds.height;

                // 绘制裁剪后的图片
                croppedCtx.drawImage(
                    img,
                    bounds.left, bounds.top,
                    bounds.width, bounds.height,
                    0, 0,
                    bounds.width, bounds.height
                );

                // 创建新图片元素
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

                // 将裁剪后的图片转换为base64
                croppedImg.src = croppedCanvas.toDataURL('image/png');

                const wrapper = document.createElement("div");
                wrapper.className = "canvas-item-wrapper";
                wrapper.style.position = "relative";
                wrapper.style.cursor = "move";
                wrapper.appendChild(croppedImg);
                wrapper.addEventListener('mousedown', startDragging);
                
                canvas.appendChild(wrapper);
            };

            img.src = element.src;
        }
    });
}

// 辅助函数：找到图片中不透明区域的边界
function findImageBounds(imageData, width) {
    const data = imageData.data;
    const height = imageData.height;
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;

    // 扫描所有像素找到边界
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            // 检查像素是否不是黑色（即不透明）
            if (data[index] > 0) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }

    // 添加一些padding
    const padding = 2;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(width - 1, maxX + padding);
    maxY = Math.min(height - 1, maxY + padding);

    return {
        left: minX,
        top: minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1
    };
}