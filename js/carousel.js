
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
const setSlidePosition = (slide, idx) => {
    slide.style.left = `${idx * slideWidth}px`;
};
slides.forEach(setSlidePosition);

const moveToSlide = (currentSlide, targetSlide)=>{
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current_slide');
    targetSlide.classList.add('current_slide');
}

const updateDots = (currentDot, targetDot)=>{
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}

// when I click left, move slide to the left
nextButton.addEventListener('click', ()=>{
    const currentSlide = track.querySelector('.current_slide');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(currentSlide, nextSlide);

    const currentDot = dotsNav.querySelector('.current_slide');
    const nextDot = currentDot.nextElementSibling;
    updateDots(currentDot, nextDot);
});

// when I click right, move slide to the right
prevButton.addEventListener('click', ()=>{
    const currentSlide = track.querySelector('.current_slide');
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(currentSlide, prevSlide);

    const currentDot = dotsNav.querySelector('.current_slide');
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);
})

// when I click the nav indicators, move to the that slide
dotsNav.addEventListener('click', (e)=>{
    const targetDot = e.target.closest('button');
    if(!targetDot) return;

    const currentSlide = track.querySelector('.current_slide');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIdx = dots.findIndex(dot => dot === targetDot);

    const targetSlide = slides[targetIdx];
    moveToSlide(currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})