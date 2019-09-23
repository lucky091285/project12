/* eslint-env browser */

const placesList = document.querySelector('.places-list');
const popupPlace = document.querySelector('#place');
const popupProfile = document.querySelector('#profile');
const popupAvatar = document.querySelector('#avatar');
const bigImage = document.querySelector('#bigImage');
const userInfo = document.querySelector('.user-info');
const userPhoto = document.querySelector('.user-info__photo');

/**
 * Можно улучшить
 *
 * Код стоит делать более компактным и форматировать в едином стиле,
 * используя одинаковое количество строк между функциями - например две.
 * Разные логические части удобно размещать в нескольких файлах.
 */

// Закрытие карточки

const closeImage = document.querySelector('#closeImage');
const closeCard = document.querySelector('#closeCard');
const closeProfile = document.querySelector('#closeProfile');
const closeAvatar = document.querySelector('#closeAvatar');
const jaqName = document.querySelector('.user-info__name');
const jaqJob = document.querySelector('.user-info__job');

// Валидация формы
// Переменные

const form1 = document.querySelector('#form1');
const submit1 = document.querySelector('#submit1');

const form2 = document.querySelector('#form2');
const submit2 = document.querySelector('#submit2');

const placeName = document.querySelector('#placename');
const placeLink = document.querySelector('#placelink');

const usName = document.querySelector('#username');
const usJob = document.querySelector('#userjob');

const newAvatar = document.querySelector('#picavatar');
const form3 = document.querySelector('#form3');
const submit3 = document.querySelector('#submit3');

/**
 * Можно улучшить
 *
 * Из названия переменной должно быть очевидно назначение
 * const formAdd например в этом плане лучше цифровых обозначений
 */

// Слушатели

submit2.addEventListener('click', sendProfile);
submit3.addEventListener('click', sendAvatar);

placeName.addEventListener('input', handleValidate);
placeLink.addEventListener('input', handleValidate);

usName.addEventListener('input', handleValidate);
usJob.addEventListener('input', handleValidate);

newAvatar.addEventListener('input', handleValidate);

form1.addEventListener('input', placeBtn);
form2.addEventListener('input', userBtn);
form3.addEventListener('input', avatarBtn);

//Увеличение картинки

placesList.addEventListener('click', function(event) {
  if (event.target.classList.contains('place-card__image')) {
    const  popupImage= document.querySelector('.popup__image');
    popupImage.src = event.target.style.backgroundImage.slice(5,-2);
    popImage.zoomImage();
  }
});

// Функции

// Валидация

function handleValidate(event) {
  // с помощью деструктуризации объекта легко вытащить конкретный ключ из события
  // handleValidate({target})
  // resetError(target)
  resetError(event.target);
  validate(event.target);
}

function validate(element) {
  const errorElement = document.querySelector(`#error-${element.id}`);

  if (!element.checkValidity()) {
    errorElement.textContent = element.validationMessage;
    activateError(errorElement);
    return false;
  } else if (!isUserMatch (element)) {
    const errorMessage = 'Должно быть от 2 до 30 символов!';
    errorElement.textContent = errorMessage;
    activateError(errorElement);
    return false;
  }
  return true;
}

function activateError(element) {
  element.parentNode.classList.add('popup__invalid');
}

function resetError(element) {
  element.parentNode.classList.remove('popup__invalid');
  element.textContent = '';
}

// Проверка длинны текста

function isUserMatch(element) {
  if(element.id !== username.id && element.id !== userjob.id && element.id !== placeName.id) {
    return true;
  }
  if(element.value.length >= 2 && element.value.length <= 30 ) {
    resetError(element);
    return true;
  }
  return false;
}

// Активная кнопка

function placeBtn() {
  if(placeName.value.length === 0 || placeLink.value.length === 0 || placeName.value.length > 30 || !placeLink.validity.valid) {
    submit1.setAttribute('disabled', true);
    submit1.classList.add('popup__button_disabled');
} else {
  submit1.removeAttribute('disabled', true);
  // для удаления атрибута не обязательно передавать второй аргумент со значением
  // доступна более короткая запись elem.disabled = false
  submit1.classList.remove('popup__button_disabled');
}
}

function userBtn() {
  if(usName.value.length < 2 || usJob.value.length < 2 || usName.value.length > 30 || usJob.value.length > 30) {
    submit2.setAttribute('disabled', true);
    // elem.disabled = true
    submit2.classList.add('popup__button_disabled');
}  else {
  submit2.removeAttribute('disabled', true);
  submit2.classList.remove('popup__button_disabled');
}
}

function avatarBtn() {
  if(newAvatar.value.length === 0 || !newAvatar.validity.valid) {
    submit3.setAttribute('disabled', true);
    // elem.disabled = true
    submit3.classList.add('popup__button_disabled');
}  else {
  submit3.removeAttribute('disabled', true);
  submit3.classList.remove('popup__button_disabled');
}
}



function sendProfile(event) {
  event.preventDefault();

  const inputs = Array.from(form2.elements);

  function addUser() {
    jaqName.textContent = form2.elements.username.value;
    jaqJob.textContent = form2.elements.userjob.value;
  };

  // [...form2.elements]

  api.editProfile();

  // setTimeout(renderLoading, 10000);

  let isValidForm = true;
  // функция валидации идентична указанной в sendForm
  // согласно принципу DRY можно вынести в общую отдельную функцию
  // которая может валидировать любые формы
  inputs.forEach((element) => {
    if (element.id !== submit2.id) {
      if (!validate(element)) isValidForm = false;
    }
  });

  if (isValidForm) {
    addUser(form2.elements.username.value, form2.elements.userjob.value);
    popProfile.newUser(); // форматирование
  } else {
    return false; // не используется
  }
}

// Функция загрузки

function renderLoading(isLoading) {
  if(isLoading) {
    submit2.textContent = 'Загрузка...';
  } else {
    submit2.textContent = 'Сохранить';
  }
}


// Смена аватара

function sendAvatar(event) {
  event.preventDefault();

  const inputs = Array.from(form3.elements);

  function addAvatar() {
    userPhoto.style.backgroundImage = `url(${form3.elements.link.value})`;
  };
  // в ES6 массивы можно делать через spread оператор и литерал массива
  // [...form1.elements]
  // http://jsraccoon.ru/es6-spread-rest
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#%D0%9B%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D0%BB_%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0

  api.editAvatar();

  let isValidForm = true;

  inputs.forEach((element) => {
    if (element.id !== submit3.id) {
      if (!validate(element)) isValidForm = false;
    }
  });


  if (isValidForm) {
    addAvatar(form3.elements.link.value);
    popAvatar.avatPopup();
    form3.reset();

  } else {
    return false;
  }
}

// Card
// Это класс, создающий карточку.
// Добавьте ему методы constructor, like и remove.
// И ещё один — create. Он будет создавать DOM-элемент карточки.

class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }

  addCard() {
    const placeCard = document.createElement('div');
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
    // существуют фрагменты специально придуманные для временного размещения DOM элементов
    placeCard.classList.add('place-card');
    placeCard.addEventListener('mousedown', function() {
        cardDeleteButton.removeAttribute('disabled');
    })

    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');
    cardImage.style.backgroundImage = `url(${this.link})`;

    // Корзина

    const cardDeleteButton = document.createElement('button');
    cardDeleteButton.classList.add('place-card__delete-icon');

    // Удаление карточки

    cardDeleteButton.addEventListener('click', this.remove);

    const discription = document.createElement('div');
    discription.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;

    // Лайк

    const cardLike = document.createElement('button');
    cardLike.classList.add('place-card__like-icon');

    // Ставим лайки

    cardLike.addEventListener('click', this.like);

    // Счетчик лайков

    //const howLike = document.createElement('')

    placeCard.appendChild(cardImage);
        cardImage.appendChild(cardDeleteButton);
    placeCard.appendChild(discription);
        discription.appendChild(cardName);
        discription.appendChild(cardLike);

    placesList.appendChild(placeCard);

    return placesList;

    }

    remove() {
      placesList.removeChild(event.target.closest('.place-card'));
    }

    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
  }

}


// CardList
// Это класс для хранения и отрисовки карточек. Метод constructor этого класса должен принимать два параметра:
// DOM-элемент — контейнер, куда нужно складывать карточки;
// массив карточек, которые будут на странице при загрузке.
// Ещё у класса CardList должны быть два метода:
// addCard для добавления карточки в список;
// render для отрисовки карточек при загрузке страницы.

class CardList {
  constructor(placesList/*, initialCards*/) {
    this.placesList = placesList;
    // this.initialCards = initialCards;
  }

  sendForm(event) {
    event.preventDefault();

    const inputs = Array.from(form1.elements);
    // в ES6 массивы можно делать через spread оператор и литерал массива
    // [...form1.elements]
    // http://jsraccoon.ru/es6-spread-rest
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#%D0%9B%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D0%BB_%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0

    let isValidForm = true;

    inputs.forEach((element) => {
      if (element.id !== submit1.id) {
        if (!validate(element)) isValidForm = false;
      }
    });


    if (isValidForm) {
      const card = new Card(form1.elements.placename.value, form1.elements.link.value);
      card.addCard();
      popPlace.newCard();
      form1.reset();

    } else {
      return false;
    }
  }


  // render() {
  //   const initialCards = this.initialCards;
  //   initialCards.forEach(function(item) {
  //     const card = new Card(item.name, item.link);
  //       card.addCard();
  //   })
  // }
}

const cardList = new CardList(placesList/*, initialCards*/);

// cardList.render();

submit1.addEventListener('click', cardList.sendForm);

// Popup
// Это класс для всплывающего окна. Добавьте ему методы open и close, чтобы показывать и скрывать попап.
// Есть два подхода, как можно реализовать всплывающие окна:
// сделать единый контейнер для всех попапов и менять его содержимое при открытии;
// сделать независимые попапы в разных контейнерах.
// Первый способ одновременно лучше и сложнее.
// Но вы сами можете выбрать, как реализовать попап.

class Popup {
  constructor(popupPlace, popupProfile, bigImage) {
  this.popupPlace = popupPlace;
  this.popupProfile = popupProfile;
  this.bigImage = bigImage;
}
newCard() {
  placeBtn();
  popupPlace.classList.toggle('popup_is-opened');
  form1.reset();
  };
newUser() {
  api.openProfile();
  userBtn();
  popupProfile.classList.toggle('popup_is-opened');
  };
zoomImage() {
  bigImage.classList.add('popup__content-image');
  bigImage.classList.toggle('popup_is-opened');
  };
avatPopup() {
  avatarBtn();
  popupAvatar.classList.toggle('popup_is-opened');
}
}

const popPlace = new Popup(popupPlace);
const popProfile = new Popup(popupProfile);
const popImage = new Popup(bigImage);
const popAvatar = new Popup(popupAvatar);

const formButton = document.querySelector('.user-info__button');
formButton.addEventListener('click', popPlace.newCard);

const editButton = document.querySelector('.user-info__button_edit');
editButton.addEventListener('click', popProfile.newUser);

const avatarClick = document.querySelector('.user-info__photo');
avatarClick.addEventListener('click', popAvatar.avatPopup);

const popupButton = document.querySelector('.popup__button');

closeImage.addEventListener('click', popImage.zoomImage);
closeCard.addEventListener('click', popPlace.newCard);
closeProfile.addEventListener('click', popProfile.newUser);
closeAvatar.addEventListener('click', popAvatar.avatPopup);

class Api {
  constructor({baseUrl, headers,}) {
    this.baseUrl = baseUrl
    this.headers = headers
    // тело конструктора
    /**
     * Надо исправить
     *
     * Переданный объект с параметрами api не используется
     * Лучше записывать конкретные параметры в свойства для использования
     * по всему классу
     * constructor({baseUrl, headers})
     *
     * this.baseUrl = baseUrl
     * this.headers = headers
     */
  }

// Загрузка профиля при загрузке страницы

  loadProfile() {

    fetch(`users/3c8c16ee9b1f89a2f8b5e4b2`, {
      headers: this.headers
    })
        .then(res => res.json())
        .then(({name, about, avatar}) => {
          console.log(name);
          console.log(about);
          console.log(avatar);
          if (name && about && avatar) {
          jaqName.textContent = name;
          jaqJob.textContent = about;
          userPhoto.style.backgroundImage = `url(${avatar})`;
          }
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
      });
      }

//  Открытие формы профиля с данными с сервера

openProfile() {
  usName.value = jaqName.textContent;
  usJob.value = jaqJob.textContent;
  // submit2.textContent = 'Сохранить';
}

      // Изменение профиля

editProfile() {
  fetch(`users/Douglas Engelbart`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
        name: form2.elements.username.value,
        about: form2.elements.userjob.value,

    })
  })
  .then(res => {
    res.json();
    console.log(res);
  })
  .then(() => {
    renderLoading(true);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  })
  .finally(() => {
  renderLoading(false);
  });
  }

  // Загрузка картинок

loadCard() {
    fetch(`cards`, {
      headers: this.headers
  })
      .then(res => res.json())
      .then((data) => {
        if(data && data.length > 0) {
        // Надо исправить
        // Перед обновлением элементов стоит проверять что данные пришли корректно
        // data && data.length > 0 поможет быть уверенным что массив не пустой
        data.forEach(function(item) {
        const card = new Card(item.name, item.link);
          card.addCard();
      })
      }
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

//  Добавление новой карточки

addPlace() {
  fetch(`cards`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      name: form1.elements.placename.value,
      link: form1.elements.link.value
  })
  })
  .then((res) => {
    return res.json();
  })
}

// Смена аватарки

editAvatar() {
  fetch(`users`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: form3.elements.link.value,
  })
  })
  .then((res) => {
    return res.json();
  })
}

}

const api = new Api({
  baseUrl: 'https://localhost:3000',
  headers: {
    authorization: '54bc3077-f332-488b-8fa2-e6f5fbfbe80e',
    'Content-Type': 'application/json'
  }
});

api.loadProfile();
api.loadCard();

// Загрузка профиля при загрузке страницы



// function loadProfile() {

// fetch('http://95.216.175.5/cohort1/users/me', {
//     headers: {
//         authorization: '54bc3077-f332-488b-8fa2-e6f5fbfbe80e'
//     }
// })
//     .then(res => res.json())
//     .then((data) => {
//       jaqName.textContent = data.name;
//       jaqJob.textContent = data.about;
//       avatar.style.backgroundImage = `url(${data.avatar})`;
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log('Ошибка. Запрос не выполнен: ', err);
//   });
//   }

// //  Открытие формы профиля с данными с сервера

//   function openProfile() {

//     fetch('http://95.216.175.5/cohort1/users/me', {
//         headers: {
//             authorization: '54bc3077-f332-488b-8fa2-e6f5fbfbe80e'
//         }
//     })
//         .then(res => res.json())
//         .then((data) => {
//           usName.value = data.name;
//           usJob.value = data.about;
//           console.log(data);
//         })
//         .catch((err) => {
//           console.log('Ошибка. Запрос не выполнен: ', err);
//       });
//       }



// // Изменение профиля

// function editProfile() {
// fetch('http://95.216.175.5/cohort1/users/me', {
//   method: 'PATCH',
//   headers: {
//       authorization: '54bc3077-f332-488b-8fa2-e6f5fbfbe80e',
//       'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//       name: form2.elements.username.value,
//       about: form2.elements.userjob.value
//   })
// })
// }
  // .then((res) => {
  //   return res.json();
  // })
  // .then((data) => {
  //   console.log(data);
  // });

//   // Загрузка картинок

//   function loadCard() {
//   fetch('http://95.216.175.5/cohort1/cards', {
//     headers: {
//         authorization: '54bc3077-f332-488b-8fa2-e6f5fbfbe80e'
//     }
// })
//     .then(res => res.json())
//     .then((data) => {
//       data.forEach(function(item) {
//       const card = new Card(item.name, item.link);
//         card.addCard();
//     })
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log('Ошибка. Запрос не выполнен: ', err);
//   });
// }






