const editBtn = document.querySelector('.profile__button_type_edit');
const closeBtnsPopup = document.querySelectorAll('.popup__close-btn');
const saveEditBtn = document.querySelector('.popup__button_save-profileChanges');
const saveNewCardBtn = document.querySelector('.popup__button_save-newCard');
const likeBtn = document.querySelectorAll('.places__like-button');
const placesSection = document.querySelector('.places');
const addBtn = document.querySelector('.profile__button_type_add');
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


const profileName = document.querySelector('.profile__name');
const profileDescribe = document.querySelector('.profile__describe');

const popupEdit = document.querySelector('.popup_edit');
const popupName = popupEdit.querySelector('.popup__input_form_name');
const popupDescribe = popupEdit.querySelector('.popup__input_form_describe');

const popupAdd = document.querySelector('.popup_add');
const popupCardName = popupAdd.querySelector('.popup__input_form_card-name');
const popupCardLink = popupAdd.querySelector('.popup__input_form_card-link');


function showPopupEdit(){
    popupEdit.classList.add('popup_show');    
    popupName.value = profileName.textContent;
    popupDescribe.value = profileDescribe.textContent;
}

function showPopupAdd(){
    popupAdd.classList.add('popup_show');
}

function hidePopup(){
    const openedPopup = document.querySelector('.popup_show');
    openedPopup.classList.remove('popup_show');
}

function changeInfo(evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;    
    profileDescribe.textContent = popupDescribe.value;
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
    newCard.querySelector('.places__photo').addEventListener('click',showPicture);

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
    const name = popupCardName.value;
    const link = popupCardLink.value;
    const card = createPlacesCard(link,name);
    placesSection.prepend(card);
    popupCardName.value = '';
    popupCardLink.value = '';
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
    const popupImage = document.querySelector('.popup-image_show');
    popupImage.classList.remove('popup-image_show');
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



