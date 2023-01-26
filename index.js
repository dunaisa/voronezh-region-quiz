const defaultList = [

  'Воробьёвский район',
  'Поворинский район',
  'Борисоглебский район',
  'Грибановский район',
  'Терновский район',
  'Аннинский район',
  'Эртильский район',
  'Панинский район',
  'Верхнехавский район',
  'Новоусманский район',
  'Воронеж',
  'Рамонский район',
  'Семилукский район',
  'Нижнедевицкий район',
  'Хохольский район',
  'Репьёвский район',
  'Каширский район',
  'Бобровский район',
  'Лискинский район',
  'Острогожский район',
  'Каменский район',
  'Таловский район',
  'Новохопёрский район',
  'Бутурлиновский район',
  'Павловский район',
  'Подгоренский район',
  'Ольховатский район',
  'Россошанский район',
  'Кантемировский район',
  'Верхнемамонский район',
  'Богучарский район',
  'Петропавловский район',
  'Калачеевский район'
];

//   'Тамбовская область',
// 'Саратовская область',
//   'Волгоградская область',
//   'Ростовская область',
//   'Белгородская область',
//   'Курская область',
//   'Липецкая область',
//   'Пензенская область',

// const defaultList = [
//   'Бутурлиновский район',
//   'Павловский район',
//   'Подгоренский район',
//   'Ольховатский район',
//   'Россошанский район',
//   'Кантемировский район',
//   'Верхнемамонский район',
//   'Богучарский район',
//   'Петропавловский район',
//   'Калачеевский район'
// ];

const colors = ['#6B4E71', '#3A4454', '#53687E', '#4281A4', '#48A9A6', '#C1666B', '#D4B483'];

const animation = document.getElementById('animation');

const countryName = document.querySelector('.container__form-country-name');

const countriesClassName = document.getElementsByClassName('region');

const countriesCheckedClassName = document.getElementsByClassName('country_type_checked');

let matchCountryName, matchCountry;

const button = document.querySelector('.container__form-btn');
const startGameBtn = document.querySelector('.container__start-wrapper-btn');
const buttonStartWrapper = document.querySelector('.container__start-wrapper');
const buttonStartText = document.querySelector('.container__start-wrapper-btn-text');
const questionForm = document.querySelector('.container__form');

const resultContainer = document.querySelector('.container__result-wrapper');
const totalRightAnswersText = document.querySelector('.container__result-percent');
const restartGameBtn = document.querySelector('.container__result-btn');

const progressBar = document.querySelector('.circular-progress');
const progressBarPercent = document.querySelector('.circular-progress__percent');

const zoomBtnPlus = document.querySelector('.zoom__btn_type_plus');
const zoomBtnMinus = document.querySelector('.zoom__btn_type_minus');
const map = document.querySelector('.map');
// map.style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(1.5)';

for (i = 0; countriesClassName.length > i; i++) {
  countriesClassName[i].addEventListener('click', function () {
    // console.log(countriesCheckedClassName[0])
    let currentActive = countriesCheckedClassName[0];
    // console.log(currentActive)
    if (currentActive) {
      currentActive.classList.remove("country_type_checked");
      button.classList.remove("container__form-btn_type_active");
    };
    if (currentActive !== this) {
      this.classList.add("country_type_checked");
      button.classList.add("container__form-btn_type_active");
      matchCountry = this;

      matchCountryName = this.attributes.name.nodeValue;
      console.log(matchCountryName)
      return matchCountryName;
    };
  });
};

// Перемешали страны

// Записали страну в вопрос

let newDefaultArray, currentCountryIndex;

let totalRightAnswers = [];

newDefaultArray = defaultList.sort(() => Math.random() - 0.5);
currentCountryIndex = 0;

function handleStartGame() {
  countryName.textContent = newDefaultArray[currentCountryIndex];
};

function setNextCountry() {
  console.log(currentCountryIndex)
  console.log(newDefaultArray.length - 1)
  if (currentCountryIndex !== newDefaultArray.length - 1) {

    currentCountryIndex = currentCountryIndex + 1;
    countryName.textContent = newDefaultArray[currentCountryIndex];

  } else {

    showResult();
  }
};

function showResult() {
  console.log('Last country')

  button.classList.add('container__form-btn_type_hidden');
  questionForm.classList.add('container__form_type_hidden');

  resultContainer.classList.remove('container__result-wrapper_type_hidden')
  totalRightAnswersText.textContent = `${totalRightAnswers.length}`;

  let progressMinValue = 0;
  let progressMaxValue = totalRightAnswers.length;
  let progressAnimationSpeed = 50;

  let progress = setInterval(() => {

    if (progressMaxValue === 0) {
      progressBarPercent.textContent = '0%'
    } else {
      progressMinValue++;
      progressBarPercent.textContent = `${Math.round((progressMinValue / defaultList.length) * 100)}%`;

      // progressBarPercent.textContent = `${progressMinValue}%`;
      progressBar.style.background = `conic-gradient(
      #3a4454 ${(progressMinValue * 100 / defaultList.length) * 3.6}deg,
      #f5f0fd ${(progressMinValue * 100 / defaultList.length) * 3.6}deg
      )`;
    }
    // console.log(progressBar.style)
    if (progressMinValue === progressMaxValue) {
      clearInterval(progress)
    }
  }, progressAnimationSpeed)
}

// Сравнили выбранную страну и страну в вопросе

function compareAnswer() {


  if (newDefaultArray[currentCountryIndex] === matchCountryName) {
    matchCountry.classList.remove('country_type_checked');

    // matchCountry.classList.add('country_type_match');
    matchCountry.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)])
    totalRightAnswers.push(matchCountryName)
    console.log(totalRightAnswers)
    // return true
  } else {
    matchCountry.classList.remove('country_type_checked');
    // return false
  }
};

startGameBtn.addEventListener('click', function () {

  buttonStartText.textContent = 'Загружаю...';

  animation.classList.remove('fill__animation_type_hidden');

  setTimeout(function () {
    // уменьшение кнопки после анимации
    buttonStartWrapper.classList.add('container__start-wrapper_type_vanish');
  }, 3900);

  setTimeout(function () {

    buttonStartWrapper.classList.add('container__start-wrapper_type_hidden');
    button.classList.remove('container__form-btn_type_hidden');
    questionForm.classList.remove('container__form_type_hidden');
  }, 4200);

  handleStartGame();
});

button.addEventListener('click', function () {
  button.classList.remove("container__form-btn_type_active");

  compareAnswer();
  setNextCountry();
});

restartGameBtn.addEventListener('click', function () {
  history.go();
});

// function addOnWheel(map, handler) {
//   if (map.addEventListener) {
//     if ('onwheel' in document) {
//       // IE9+, FF17+
//       map.addEventListener("wheel", handler);
//     } else if ('onmousewheel' in document) {
//       // устаревший вариант события
//       map.addEventListener("mousewheel", handler);
//     } else {
//       // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
//       map.addEventListener("MozMousePixelScroll", handler);
//     }
//   } else { // IE8-
//     map.attachEvent("onmousewheel", handler);
//   }
// }

// let scale = 1;

// addOnWheel(map, function (e) {

//   let delta = e.deltaY || e.detail || e.wheelDelta;

//   // отмасштабируем при помощи CSS
//   if (delta > 0) scale += 0.05;
//   else scale -= 0.05;

//   map.style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(' + scale + ')';

//   // отменим прокрутку
//   e.preventDefault();
// });

// const container = document.querySelector('.container');
// let startY;
// let startX;
// let scrollLeft;
// let scrollTop;
// let isDown;

// map.addEventListener('mousedown', e => mouseIsDown(e));
// map.addEventListener('mouseup', e => mouseUp(e))
// map.addEventListener('mouseleave', e => mouseLeave(e));
// map.addEventListener('mousemove', e => mouseMove(e));

// function mouseIsDown(e) {
//   console.log('ok')
//   isDown = true;
//   startY = e.pageY - map.offsetTop;
//   startX = e.pageX - map.offsetLeft;
//   scrollLeft = map.scrollLeft;
//   scrollTop = map.scrollTop;
// }
// function mouseUp(e) {
//   console.log('ok')
//   isDown = false;
// }
// function mouseLeave(e) {
//   isDown = false;
// }
// function mouseMove(e) {
//   if (isDown) {
//     e.preventDefault();
//     //Move vertcally
//     const y = e.pageY - map.offsetTop;
//     const walkY = y - startY;
//     map.scrollTop = scrollTop - walkY;

//     //Move Horizontally
//     const x = e.pageX - map.offsetLeft;
//     const walkX = x - startX;
//     map.scrollLeft = scrollLeft - walkX;

//   }
// }
