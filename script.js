// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('nav ul li a');
    const dropdowns = document.querySelectorAll('.dropdown');

    // モバイル表示時のドロップダウンメニューの制御
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                // 他のドロップダウンを閉じる
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                dropdown.classList.toggle('active');
            }
        });
    });

    // メニューアイテムのクリックイベント
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // モバイル表示時にドロップダウンメニューを閉じる
                if (window.innerWidth <= 768) {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            }
        });
    });

    // 画面外クリックでドロップダウンを閉じる
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ヘッダーの表示/非表示
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 下スクロール時はヘッダーを非表示
        header.style.transform = 'translateY(-100%)';
    } else {
        // 上スクロール時はヘッダーを表示
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// プロジェクト画像の読み込み完了時のアニメーション
document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'translateY(0)';
    });
});

function scrollToSelectedProject() {
    const select = document.getElementById('projectSelect');
    const projectId = select.value;
    
    if (projectId) {
        const element = document.getElementById(projectId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// プロジェクトナビゲーションのアクティブ状態を更新
function updateActiveProject() {
    const projects = document.querySelectorAll('.project');
    const navLinks = document.querySelectorAll('.project-nav a');
    
    // 現在表示されているプロジェクトを検出
    const currentProject = projects.find(project => {
        const rect = project.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
    });

    if (currentProject) {
        const currentId = currentProject.id;
        // ナビゲーションリンクのアクティブ状態を更新
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }
}

// スクロール時にアクティブプロジェクトを更新
window.addEventListener('scroll', updateActiveProject);

// プロジェクトタイトルをクリックしたときのスクロール
document.querySelectorAll('.project h3').forEach(title => {
    title.addEventListener('click', () => {
        const project = title.closest('.project');
        project.scrollIntoView({ behavior: 'smooth' });
    });
});

// プロジェクト画像をクリックしたときのスクロール
document.querySelectorAll('.project-image-container').forEach(container => {
    container.addEventListener('click', () => {
        const project = container.closest('.project');
        project.scrollIntoView({ behavior: 'smooth' });
    });
});

// 初期表示時にアクティブプロジェクトを設定
document.addEventListener('DOMContentLoaded', updateActiveProject);
