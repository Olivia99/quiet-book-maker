function initQuietBook() {
    // 初始化页面数据
    window.bookPages = {
        pages: []
    };
    
    // 绑定按钮事件
    const deleteBtn = document.getElementById('deletePage');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteCurrentPages);
    }
    
    const addPageBtn = document.getElementById('addPage');
    if (addPageBtn) {
        addPageBtn.addEventListener('click', addNewPages);
    }
    
    // 初始化导航
    updatePageNavigation();
    // 默认选中封面
    switchToPage('front-cover');
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
    
    // 添加所有内页
    bookPages.pages.forEach((page, index) => {
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
    
    // 更新删除按钮状态
    const deleteBtn = document.getElementById('deletePage');
    if (deleteBtn) {
        // 封面和封底不能删除，禁用删除按钮
        if (pageId === 'front-cover' || pageId === 'back-cover') {
            deleteBtn.classList.add('disabled');
            deleteBtn.setAttribute('disabled', 'disabled');
        } else {
            deleteBtn.classList.remove('disabled');
            deleteBtn.removeAttribute('disabled');
        }
    }
    
    // 更新当前页面显示
    const currentPage = document.querySelector('.current-page');
    if (pageId === 'front-cover' || pageId === 'back-cover') {
        // 显示单页（封面或封底）
        currentPage.innerHTML = `
            <div class="page-container">
                <div class="page single-page"></div>
                <div class="page-number">${pageId === 'front-cover' ? '封面' : '封底'}</div>
            </div>
        `;
    } else {
        // 获取当前页码
        const clickedPageNum = parseInt(pageId.split('-')[1]);
        // 计算应该显示的页码对（确保左边是奇数，右边是偶数）
        const leftPageNum = clickedPageNum % 2 === 0 ? clickedPageNum - 1 : clickedPageNum;
        const rightPageNum = leftPageNum + 1;

        // 显示左右页
        currentPage.innerHTML = `
            <div class="page-container">
                <div class="page left-page" data-page-type="left"></div>
                <div class="page-number">第 ${leftPageNum} 页</div>
            </div>
            <div class="page-container">
                <div class="page right-page" data-page-type="right"></div>
                <div class="page-number">第 ${rightPageNum} 页</div>
            </div>
        `;
    }
}

// 确保在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 加载完成，开始初始化');
    initQuietBook();
});



// 显示通知的函数
function showNotification(message, type = 'success') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 淡入效果
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 3秒后淡出并移除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300); // 等待淡出动画完成
    }, 3000);
}


function deleteCurrentPages() {
    if (!window.currentPageIndex || window.currentPageIndex === 'front-cover' || window.currentPageIndex === 'back-cover') {
        return;
    }

    // 获取当前页面编号
    const clickedPageNum = parseInt(window.currentPageIndex.split('-')[1]);
    // 确保左页是奇数，右页是偶数
    const leftPageNum = clickedPageNum % 2 === 0 ? clickedPageNum - 1 : clickedPageNum;
    const rightPageNum = leftPageNum + 1;

    // 显示确认对话框
    if (confirm(`确认要删除第 ${leftPageNum} 页和第 ${rightPageNum} 页吗？\n注意：这将会同时删除这一对页面！`)) {
        // 计算在 bookPages.pages 数组中的索引
        const pageIndex = Math.floor((leftPageNum - 1) / 2);

        // 从数据结构中删除该页面对
        bookPages.pages.splice(pageIndex, 1);

        // 重新生成导航
        updatePageNavigation();
        
        // 切换到最后一页
        if (bookPages.pages.length > 0) {
            // 如果还有页面，切换到最后一对页面的第一页（奇数页）
            const lastPageNum = bookPages.pages.length * 2 - 1;
            switchToPage(`page-${lastPageNum}`);
        } else {
            // 如果没有页面了，切换到封面
            switchToPage('front-cover');
        }

        // 显示删除成功提示
        showNotification(`已删除第 ${leftPageNum} 页和第 ${rightPageNum} 页`);
    }
}