function initQuietBook() {
    // 初始化数据结构
    window.bookPages = {
        frontCover: { elements: [], background: null },
        pages: [],  // 存储左右页面对
        backCover: { elements: [], background: null }
    };
    
    // 初始化当前页面索引
    window.currentPageIndex = 'front-cover';
    
    // 初始化页面导航 - 只添加封面和封底
    updatePageNavigation();
    
    // 绑定按钮事件
    const addPageBtn = document.getElementById('addPage');
    if (addPageBtn) {
        // 移除可能存在的旧事件监听器
        addPageBtn.removeEventListener('click', addNewPages);
        // 添加新的事件监听器
        addPageBtn.addEventListener('click', addNewPages);
    }
}

// 添加新页面的函数
function addNewPages() {
    console.log('添加新页面前的页面数量:', bookPages.pages.length);
    
    // 添加一对新页面（左右页）到数据结构中
    bookPages.pages.push({
        left: { elements: [], background: null },
        right: { elements: [], background: null }
    });

    console.log('添加新页面后的页面数量:', bookPages.pages.length);

    // 更新导航栏
    const navigation = document.querySelector('.page-navigation');
    if (!navigation) {
        console.error('未找到导航容器');
        return;
    }
    
    // 在封底之前插入新的一行（两页）
    const pageRow = createPageRow();
    const pageNum = bookPages.pages.length * 2 - 1;  // 计算新页面的编号
    
    // 创建左页缩略图
    const leftThumb = createPageThumb(`page-${pageNum}`, `第 ${pageNum} 页`);
    leftThumb.dataset.pageType = 'left';
    pageRow.appendChild(leftThumb);
    
    // 创建右页缩略图
    const rightThumb = createPageThumb(`page-${pageNum + 1}`, `第 ${pageNum + 1} 页`);
    rightThumb.dataset.pageType = 'right';
    pageRow.appendChild(rightThumb);
    
    // 在封底之前插入新行
    const backCoverRow = navigation.lastElementChild;
    if (backCoverRow) {
        navigation.insertBefore(pageRow, backCoverRow);
    } else {
        navigation.appendChild(pageRow);
    }
    
    // 自动切换到新添加的左页
    switchToPage(`page-${pageNum}`);
    
    console.log('新页面添加完成');
}

// 更新页面导航的函数（仅在初始化时使用）
function updatePageNavigation() {
    const navigation = document.querySelector('.page-navigation');
    if (!navigation) {
        console.error('未找到导航容器');
        return;
    }
    
    // 清空现有内容
    navigation.innerHTML = '';
    
    // 添加封面（单页）
    const coverRow = createPageRow();
    coverRow.appendChild(createPageThumb('front-cover', '封面'));
    navigation.appendChild(coverRow);
    
    // 添加封底（单页）
    const backRow = createPageRow();
    backRow.appendChild(createPageThumb('back-cover', '封底'));
    navigation.appendChild(backRow);
}

// 创建页面行的函数
function createPageRow() {
    const row = document.createElement('div');
    row.className = 'page-row';
    return row;
}

// 创建页面缩略图的函数
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

// 切换到指定页面的函数
function switchToPage(pageId) {
    // 更新当前页面索引
    window.currentPageIndex = pageId;
    
    // 移除所有缩略图的活动状态
    document.querySelectorAll('.page-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // 添加当前缩略图的活动状态
    const currentThumb = document.querySelector(`[data-page-id="${pageId}"]`);
    if (currentThumb) {
        currentThumb.classList.add('active');
    }
    
    // 更新当前页面显示
    const currentPage = document.querySelector('.current-page');
    if (pageId === 'front-cover' || pageId === 'back-cover') {
        // 显示单页
        currentPage.innerHTML = `
            <div class="page-container">
                <div class="page single-page"></div>
                <div class="page-number">${pageId === 'front-cover' ? '封面' : '封底'}</div>
            </div>
        `;
    } else {
        // 显示左右页
        const pageNum = parseInt(pageId.split('-')[1]);
        currentPage.innerHTML = `
            <div class="page-container">
                <div class="page left-page" data-page-type="left"></div>
                <div class="page-number">第 ${pageNum} 页</div>
            </div>
            <div class="page-container">
                <div class="page right-page" data-page-type="right"></div>
                <div class="page-number">第 ${pageNum + 1} 页</div>
            </div>
        `;
    }
}

// 确保在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 加载完成，开始初始化');
    initQuietBook();
});
