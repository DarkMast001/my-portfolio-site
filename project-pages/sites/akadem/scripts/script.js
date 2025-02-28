const galleryContainer = document.querySelector('.gallery_container');

galleryContainer.addEventListener('wheel', (e) => {
    e.preventDefault(); // Предотвращаем вертикальную прокрутку
    galleryContainer.scrollBy({
        left: e.deltaY < 0 ? -300 : 300, // Прокрутка влево/вправо
        behavior: 'smooth'
    });
});

let touchStartX = 0; // Начальная позиция X
let touchEndX = 0; // Конечная позиция X
const swipeSensitivity = 1; // Чувствительность свайпа (чем меньше значение, тем медленнее прокрутка)

galleryContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX; // Запоминаем начальную точку касания
});

galleryContainer.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX; // Обновляем конечную точку
    const difference = (touchStartX - touchEndX) * swipeSensitivity; // Учитываем чувствительность
    galleryContainer.scrollBy({
        left: difference, // Прокручиваем в зависимости от направления свайпа
        behavior: 'auto' // Плавность отключаем, чтобы не накапливать задержки
    });
    touchStartX = touchEndX; // Обновляем начальную точку для последовательного свайпа
});

const slider = document.querySelector('.gallery_slider');
const slides = document.querySelectorAll('.gallery_slide_container');
const gallerySlide = document.querySelector('.gallery_slide_container');
const prevBtn = document.querySelector('.btn.prev');
const nextBtn = document.querySelector('.btn.next');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
const slideCount = slides.length;
// const slideWidth = 634; // Ширина одного слайда
const slideWidth = gallerySlide.getBoundingClientRect().width;
let autoSlideInterval;

// Функция для переключения слайдов
function goToSlide(index) {
    if (index < 0) {
        currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateIndicators();
}

// Обновление индикаторов
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Кнопки управления
prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoSlide();
});

// Индикаторы
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
        resetAutoSlide();
    });
});

// Автоматическая смена слайдов
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Интервал в 5 секунд
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Инициализация
goToSlide(0);
startAutoSlide();