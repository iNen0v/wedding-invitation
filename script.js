// Текуща страница
let currentPage = 0;

// Всички страници
const pages = document.querySelectorAll('.page');

// Функция за промяна на страницата
function changePage(direction) {
    // Скриваме текущата страница
    pages[currentPage].classList.remove('active');
    
    // Променяме номера на страницата
    currentPage += direction;
    
    // Проверка за граници
    if (currentPage < 0) {
        currentPage = 0;
    }
    if (currentPage >= pages.length) {
        currentPage = pages.length - 1;
    }
    
    // Показваме новата страница
    pages[currentPage].classList.add('active');
}

// Показваме първата страница при зареждане
window.onload = function() {
    pages[0].classList.add('active');
};
