let editBtn = document.querySelector('.profile__button_type_edit');
let closeBtnsPopup = document.querySelectorAll('.popup__close-btn');
let saveEditBtn = document.querySelector('.popup__button_save-profileChanges');
let saveNewCardBtn = document.querySelector('.popup__button_save-newCard');
let likeBtn = document.querySelectorAll('.places__like-button');
let placesSection = document.querySelector('.places');
let addBtn = document.querySelector('.profile__button_type_add');
const popupPicture = document.querySelector('.popup-image');

const initialCards = [
    {
      name: 'Крым',
      link: 'images/krim.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'images/chelyabinsk.jpg'
    },
    {
      name: 'Новгород',
      link: 'images/novgorod.jpg'
    },
    {
      name: 'Байкал',
      link: 'images/baikal.jpg'
    },
    {
      name: 'Курганская область',
      link: 'images/kurgan.jpg'
    },
    {
      name: 'Волгоград',
      link: 'images/volgrad.jpg'
    }
  ]; 


let profile__name = document.querySelector('.profile__name');
let profile__describe = document.querySelector('.profile__describe');

let popupEdit = document.querySelector('.popup_edit');
let popup__name = popupEdit.querySelector('.popup__input_form_name');
let popup__describe = popupEdit.querySelector('.popup__input_form_describe');

let popupAdd = document.querySelector('.popup_add');
let popup__card_name = popupAdd.querySelector('.popup__input_form_card-name');
let popup__card_link = popupAdd.querySelector('.popup__input_form_card-link');


function showPopupEdit(){
    popupEdit.classList.add('popup_show');    
    popup__name.value = profile__name.textContent;
    popup__describe.value = profile__describe.textContent;
}

function showPopupAdd(){
    popupAdd.classList.add('popup_show');
}

function hidePopup(){
    let openedPopup = document.querySelector('.popup_show');
    openedPopup.classList.remove('popup_show');
}

function changeInfo(evt){
    evt.preventDefault();
    profile__name.textContent = popup__name.value;    
    profile__describe.textContent = popup__describe.value;
    hidePopup();
}

function createPlacesCard(path,name){
    const template = document.querySelector('#places__card').content;
    const newCard = template.querySelector('.places__card').cloneNode(true);
    newCard.querySelector('.places__photo').src = path;
    newCard.querySelector('.places__photo').alt = name;
    newCard.querySelector('.places__name').textContent = name;
    newCard.querySelector('.places__like').addEventListener('click',likedCard);
    newCard.querySelector('.places__trash').addEventListener('click',deleteCard);
    newCard.querySelector('.places__photo').addEventListener('click',showPicture)

    return newCard
}

function initPlaces(){
    initialCards.forEach(item => {
        let card = createPlacesCard(item.link,item.name);
        placesSection.append(card);
    });
}

function createNewCard(evt){
    evt.preventDefault();
    let name = popup__card_name.value;
    let link = popup__card_link.value;
    let card = createPlacesCard(link,name);
    placesSection.prepend(card);
    popup__card_name.value = '';
    popup__card_link.value = '';
    hidePopup();
}

function likedCard(evt){
    evt.target.classList.toggle('places__like_activate');
}

function deleteCard(evt){
    evt.target.parentNode.remove();
}

function showPicture(evt){
  const link = evt.target.src;
  const name = evt.target.parentNode.querySelector('.places__name').textContent;
  showPopupPicture(link,name);
}

function showPopupPicture(path,name){    
    popupPicture.querySelector('.popup-image__picture').src = path;
    popupPicture.querySelector('.popup-image__picture').alt = name;
    popupPicture.querySelector('.popup-image__caption').textContent = name;    
    popupPicture.classList.add('popup-image_show');
}

function hidePopup_image(){
  document.querySelector('.popup-image_show').classList.remove('popup-image_show');
}

editBtn.addEventListener('click',showPopupEdit);
addBtn.addEventListener('click',showPopupAdd);
Array.from(closeBtnsPopup).forEach(btn => {
    btn.addEventListener('click',hidePopup);
});
saveEditBtn.addEventListener('click',changeInfo);
saveNewCardBtn.addEventListener('click',createNewCard);
popupPicture.querySelector('.popup-image__close-btn').addEventListener('click',hidePopup_image);
initPlaces();



