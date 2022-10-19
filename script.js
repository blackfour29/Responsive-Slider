/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable radix */

(function () {
  const sliderBottomControls = document.querySelectorAll('.slider__bottom-control');
  const sliderLeftArrow = document.querySelector('.slider__slide-left');
  const sliderRightArrow = document.querySelector('.slider__slide-right');
  const sliderImages = document.querySelectorAll('.slider__image');
  const sliderImagesContainer = document.querySelector('.slider__images-container');

  const content = document.querySelector('.content');
  let contentWidth = content.getBoundingClientRect().width;

  let pixelValue = 0;
  let maxPixelValue = (contentWidth * sliderImages.length - 1) * -1; // each image takes 600px and one is displayed by default so the most we can move the slider is 600 * n-1 images
  moveSlider(pixelValue);

  sliderRightArrow.addEventListener('click', () => {
    pixelValue -= contentWidth; // need to move slider to the left in order for the image in the right to show
    moveSlider(pixelValue);
  });

  sliderLeftArrow.addEventListener('click', () => {
    pixelValue += contentWidth; // need to move slider to the right in order for the image in the left to show
    moveSlider(pixelValue);
  });

  sliderBottomControls.forEach((sliderControl) => {
    sliderControl.addEventListener('click', () => {
      const sliderIndex = sliderControl.dataset.index;
      pixelValue = -contentWidth * sliderIndex;
      moveSlider(pixelValue);
    });
  });

  function moveSlider(pixels) {
    if (pixels < maxPixelValue) {
      pixelValue = 0;
    }
    if (pixels > 0) {
      pixelValue = contentWidth * (sliderImages.length - 1) * -1;
    }
    sliderImagesContainer.style.transform = `translateX(${pixelValue}px)`;
    const sliderBottomIndex = Math.floor(Math.abs(pixelValue / contentWidth));
    for (let i = 0; i < sliderBottomControls.length; i++) {
      sliderBottomControls[i].style.background = 'rgba(255,255,255,0.1)';
    }
    sliderBottomControls[sliderBottomIndex].style.backgroundColor = '#fff';
  }

  let sliderInterval = setInterval(runSlider, 4500);

  sliderImagesContainer.addEventListener('mouseover', () => {
    clearInterval(sliderInterval);
  });

  sliderImagesContainer.addEventListener('mouseout', () => {
    sliderInterval = setInterval(runSlider, 4500);
  });

  function runSlider() {
    pixelValue -= contentWidth;
    moveSlider(pixelValue);
  }

  window.addEventListener('resize', () => {
    contentWidth = content.getBoundingClientRect().width;
    sliderImagesContainer.style.transform = `translateX(0px)`;
    pixelValue = 0;
    maxPixelValue = (contentWidth * sliderImages.length - 1) * -1;
    for (let i = 0; i < sliderBottomControls.length; i++) {
      sliderBottomControls[i].style.background = 'rgba(255,255,255,0.1)';
    }
    sliderBottomControls[0].style.backgroundColor = '#fff';
  });
})();
