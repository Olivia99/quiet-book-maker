// 页面数据结构
let bookPages = {
    frontCover: null,
    pages: [],  // 每个元素是一个包含左右页面数据的对象
    backCover: null
};

// 当前选中的页面索引
let currentPageIndex = 0;

// 初始化函数
function initQuietBook() {
    // 初始化页面导航
    updatePageNavigation();
    
    // 初始化素材面板
    initElementsPanel();
    
    // 绑定按钮事件
    document.getElementById('addPage').addEventListener('click', addNewPages);
    document.getElementById('savePage').addEventListener('click', saveCurrentPage);
    document.getElementById('exportBook').addEventListener('click', exportBook);
}

// 初始化素材面板
function initElementsPanel() {
    const elementsPanel = document.querySelector('.elements-panel');
    
    // 定义素材分类
    const categories = {
        bedroom: ['bed', 'shelf', 'wall decoration', 'bedside drawer', 'carpet', 'curtain', 'wardrobe'],
        bathroom: ['bathtub', 'wall decoration', 'toilet', 'sink', 'mirror', 'cleaning item', '洗漱用品'],
        kitchen: ['kitchen counter', 'utencil', 'fridge', 'table', 'chair', 'food', 'drink']
    };
    
    // 生成分类界面
    Object.entries(categories).forEach(([category, subcategories]) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        // 添加大分类标题
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = category;
        categorySection.appendChild(categoryHeader);
        
        // 添加小分类列表
        const subcategoryList = document.createElement('div');
        subcategoryList.className = 'subcategory-list';
        
        subcategories.forEach(subcategory => {
            const subcategoryDiv = document.createElement('div');
            subcategoryDiv.className = 'subcategory';
            subcategoryDiv.textContent = subcategory;
            subcategoryDiv.onclick = () => showElements(category, subcategory);
            subcategoryList.appendChild(subcategoryDiv);
        });
        
        categorySection.appendChild(subcategoryList);
        
        // 添加素材网格容器
        const elementsGrid = document.createElement('div');
        elementsGrid.className = 'elements-grid';
        elementsGrid.id = `${category}-elements`;
        categorySection.appendChild(elementsGrid);
        
        elementsPanel.appendChild(categorySection);
    });
}

// 显示特定分类的素材
function showElements(category, subcategory) {
    // 清除其他分类的选中状态
    document.querySelectorAll('.subcategory').forEach(el => {
        el.style.backgroundColor = '#ff5252';
    });
    
    // 修复：使用事件参数而不是全局event
    const target = event.target;
    target.style.backgroundColor = '#d32f2f';
    
    // 获取对应的素材网格
    const elementsGrid = document.getElementById(`${category}-elements`);
    elementsGrid.innerHTML = '';
    
    // 这里应该根据category和subcategory加载对应的素材
    // 临时添加一些示例素材
    for(let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.className = 'element-item';
        element.draggable = true;
        element.addEventListener('dragstart', handleDragStart);
        elementsGrid.appendChild(element);
    }
}

// 更新页面导航
function updatePageNavigation() {
    const navigation = document.querySelector('.page-navigation');
    navigation.innerHTML = '';
    
    // 添加封面（单页）
    const coverRow = createPageRow();
    coverRow.appendChild(createPageThumb('front-cover', '封面'));
    navigation.appendChild(coverRow);
    
    // 添加内页（左右分布）
    bookPages.pages.forEach((pagePair, index) => {
        const pageRow = createPageRow();
        const pageNum = index * 2 + 1;
        
        // 创建左页缩略图
        const leftThumb = createPageThumb(`page-${pageNum}`, `第 ${pageNum} 页`);
        leftThumb.dataset.pageType = 'left';
        pageRow.appendChild(leftThumb);
        
        // 创建右页缩略图
        const rightThumb = createPageThumb(`page-${pageNum + 1}`, `第 ${pageNum + 1} 页`);
        rightThumb.dataset.pageType = 'right';
        pageRow.appendChild(rightThumb);
        
        navigation.appendChild(pageRow);
    });
    
    // 添加封底（单页）
    const backRow = createPageRow();
    backRow.appendChild(createPageThumb('back-cover', '封底'));
    navigation.appendChild(backRow);
}

// 创建页面缩略图
function createPageThumb(id, text) {
    const thumb = document.createElement('div');
    thumb.className = 'page-thumb';
    thumb.dataset.pageId = id;
    thumb.textContent = text;
    thumb.onclick = () => switchToPage(id);
    return thumb;
}

// 切换到指定页面
function switchToPage(pageId) {
    // 更新当前页面索引
    currentPageIndex = pageId;
    
    // 移除所有缩略图的活动状态
    document.querySelectorAll('.page-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // 添加当前缩略图的活动状态
    const currentThumb = document.querySelector(`[data-page-id="${pageId}"]`);
    if (currentThumb) {
        currentThumb.classList.add('active');
    }
    
    // 加载页面内容
    loadPageContent(pageId);
}

// 加载页面内容
function loadPageContent(index) {
    const leftPage = document.querySelector('.left-page');
    const rightPage = document.querySelector('.right-page');
    
    // 根据index加载对应的页面内容
    // 这里需要实现具体的页面内容加载逻辑
}

// 初始化拖拽功能
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.addEventListener('dragover', handleDragOver);
        page.addEventListener('drop', handleDrop);
    });
});

// 拖拽相关函数 - 修复乱码
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.elementType);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('text/plain');
    // 在放置位置创建元素
    // 这里需要实现具体的元素创建逻辑
}

// 导出功能
async function exportBook() {
    const button = document.getElementById('exportBook');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = '导出中...';

    try {
        // 创建一个PDF文档
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'px', [800, 600]);

        // 导出每一页
        for (let i = 0; i < bookPages.pages.length; i++) {
            if (i > 0) doc.addPage();
            
            // 转换页面为图片
            const pageImage = await convertPageToImage(i);
            doc.addImage(pageImage, 'PNG', 0, 0, 800, 600);
        }

        // 保存PDF
        doc.save('我的安静书.pdf');
    } catch (error) {
        console.error('导出失败:', error);
        alert('导出失败，请重试');
    } finally {
        button.disabled = false;
        button.textContent = originalText;
    }
}

// 将页面转换为图片
async function convertPageToImage(pageIndex) {
    return new Promise((resolve, reject) => {
        const pageContainer = document.querySelector('.current-page');
        html2canvas(pageContainer, {
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            resolve(canvas.toDataURL('image/png'));
        }).catch(reject);
    });
}

// 背景设置
function initBackgroundPanel() {
    const backgrounds = {
        solid: ['#ffffff', '#f5f5f5', '#e0e0e0'],
        patterns: ['pattern1.png', 'pattern2.png', 'pattern3.png'],
        scenes: ['bedroom.png', 'bathroom.png', 'kitchen.png']
    };

    const panel = document.createElement('div');
    panel.className = 'background-panel';
    
    // 添加颜色选择器
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.onchange = (e) => setPageBackground(e.target.value);
    panel.appendChild(colorPicker);

    // 添加预设背景
    Object.entries(backgrounds).forEach(([category, items]) => {
        items.forEach(item => {
            const bgOption = document.createElement('div');
            bgOption.className = 'bg-option';
            if (item.startsWith('#')) {
                bgOption.style.backgroundColor = item;
            } else {
                bgOption.style.backgroundImage = `url(assets/backgrounds/${item})`;
            }
            bgOption.onclick = () => setPageBackground(item);
            panel.appendChild(bgOption);
        });
    });

    document.querySelector('.elements-panel').appendChild(panel);
}

// 设置页面背景
function setPageBackground(background) {
    const currentSide = getCurrentPageSide();
    if (!currentSide) return;

    const page = currentSide.closest('.page');
    if (background.startsWith('#')) {
        page.style.backgroundColor = background;
        page.style.backgroundImage = 'none';
    } else {
        page.style.backgroundImage = `url(assets/backgrounds/${background})`;
    }
    
    savePageState();
}

// 层级管理
function initLayerControls(element) {
    const controls = document.createElement('div');
    controls.className = 'layer-controls';
    
    const buttons = [
        { text: '置顶', onclick: () => bringToFront(element) },
        { text: '置底', onclick: () => sendToBack(element) },
        { text: '上移', onclick: () => moveUp(element) },
        { text: '下移', onclick: () => moveDown(element) },
        { text: '删除', onclick: () => deleteElement(element) }
    ];

    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.onclick = btn.onclick;
        controls.appendChild(button);
    });

    element.appendChild(controls);
}

// 层级操作函数
function bringToFront(element) {
    const maxZ = Math.max(...Array.from(element.parentElement.children)
        .map(el => parseInt(el.style.zIndex) || 0));
    element.style.zIndex = maxZ + 1;
    savePageState();
}

function sendToBack(element) {
    const minZ = Math.min(...Array.from(element.parentElement.children)
        .map(el => parseInt(el.style.zIndex) || 0));
    element.style.zIndex = minZ - 1;
    savePageState();
}

function moveUp(element) {
    const currentZ = parseInt(element.style.zIndex) || 0;
    element.style.zIndex = currentZ + 1;
    savePageState();
}

function moveDown(element) {
    const currentZ = parseInt(element.style.zIndex) || 0;
    element.style.zIndex = currentZ - 1;
    savePageState();
}

// 删除元素
function deleteElement(element) {
    if (confirm('确定要删除这个元素吗？')) {
        element.remove();
        savePageState();
    }
}

// 在页面加载时初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initQuietBook();
    initBackgroundPanel();
});

// 添加缺失的函数
function getCurrentPageSide() {
    const leftPage = document.querySelector('.left-page');
    const rightPage = document.querySelector('.right-page');
    
    // 返回当前激活的页面
    if (leftPage && leftPage.classList.contains('active')) return leftPage;
    if (rightPage && rightPage.classList.contains('active')) return rightPage;
    return null;
}

// 添加缺失的函数
function savePageState() {
    // 保存当前页面状态的逻辑
    // 这里可以实现将当前页面的状态保存到 bookPages 数据结构中
}

// 添加新页面的函数
function addNewPages() {
    // 添加两个新页面到数据结构中
    bookPages.pages.push({
        left: { 
            elements: [], 
            background: null,
            isLeft: true 
        },
        right: { 
            elements: [], 
            background: null,
            isRight: true 
        }
    });

    // 更新当前页面显示
    const currentPage = document.querySelector('.current-page');
    currentPage.innerHTML = `
        <div class="page left-page" data-page-type="left"></div>
        <div class="page right-page" data-page-type="right"></div>
    `;

    // 更新导航栏
    updatePageNavigation();
}

function saveCurrentPage() {
    // 保存当前页面的逻辑
    savePageState();
}


function initializePageNavigation() {
    const navigation = document.querySelector('.page-navigation');
    navigation.innerHTML = ''; // 清空现有内容
    
    // 添加封面
    const coverRow = createPageRow();
    coverRow.appendChild(createPageThumb('front-cover', '封面'));
    navigation.appendChild(coverRow);
    
    // 添加内页（成对出现）
    const pages = document.querySelectorAll('.page');
    for (let i = 0; i < pages.length; i += 2) {
        const pageRow = createPageRow();
        pageRow.appendChild(createPageThumb(`page-${i + 1}`, `第 ${i + 1} 页`));
        if (i + 1 < pages.length) {
            pageRow.appendChild(createPageThumb(`page-${i + 2}`, `第 ${i + 2} 页`));
        }
        navigation.appendChild(pageRow);
    }
    
    // 添加封底
    const backRow = createPageRow();
    backRow.appendChild(createPageThumb('back-cover', '封底'));
    navigation.appendChild(backRow);
}

function createPageRow() {
    const row = document.createElement('div');
    row.className = 'page-row';
    return row;
}

function createPageThumb(id, text) {
    const thumb = document.createElement('div');
    thumb.className = 'page-thumb';
    thumb.dataset.pageId = id;
    
    // 创建预览框
    const preview = document.createElement('div');
    preview.className = 'thumb-preview';
    
    // 创建标题
    const title = document.createElement('div');
    title.className = 'thumb-title';
    title.textContent = text;
    
    // 组装缩略图
    thumb.appendChild(preview);
    thumb.appendChild(title);
    
    // 添加点击事件
    thumb.onclick = () => switchToPage(id);
    
    return thumb;
}
// 添加页面的函数
function addPages() {
    const navigation = document.querySelector('.page-navigation');
    const pageCount = document.querySelectorAll('.page-row:not(:first-child):not(:last-child)').length * 2;
    
    const newPageRow = createPageRow();
    newPageRow.appendChild(createPageThumb(`page-${pageCount + 1}`, `第 ${pageCount + 1} 页`));
    newPageRow.appendChild(createPageThumb(`page-${pageCount + 2}`, `第 ${pageCount + 2} 页`));
    
    // 在封底之前插入新行
    const backCoverRow = navigation.lastElementChild;
    navigation.insertBefore(newPageRow, backCoverRow);
}
