// script.js

// ハンバーガーメニューの簡単な動作を追加する場合
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('nav ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('リンクがクリックされました');
        });
    });
});
