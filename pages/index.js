import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

const settings = {  formSelector: '.popup__form',
                    fieldSelector: '.popup__set',
                    inputSelector: '.popup__input',
                    submitButtonSelector: '.popup__button',
                    inactiveButtonClass: 'popup__button_inactive',
                    inputErrorClass: 'popup__input_type_error',
                    errorClass: 'popup__error_active'
                }

const popupEdit = document.querySelector('.popup_edit');
const popupName = popupEdit.querySelector('.popup__input_form_name');
const popupDescribe = popupEdit.querySelector('.popup__input_form_describe');
const formEdit = document.querySelector('.popup__form_edit');


const popupAdd = document.querySelector('.popup_add');
const popupCardName = popupAdd.querySelector('.popup__input_form_card-name');
const popupCardLink = popupAdd.querySelector('.popup__input_form_card-link');
const formAdd = document.querySelector('.popup__form_add');

const popupPicture = document.querySelector('.popup-image');
const imagePopupPicture = popupPicture.querySelector('.popup-image__picture');
const captionPopupPicture =  popupPicture.querySelector('.popup-image__caption');

const editButton= document.querySelector('.profile__button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescribe = document.querySelector('.profile__describe');

const addButton = document.querySelector('.profile__button_type_add');
const placesSection = document.querySelector('.places');
const popups = document.querySelectorAll('.popup');

const editValidator = new FormValidator(settings, document.querySelector('.popup_edit'));
const addValidator = new FormValidator(settings, document.querySelector('.popup_add'));







function openPopup(popup){
    popup.classList.add('popup_show');
    document.addEventListener('keydown', closeByEscape); 
}

function closePopup(popup){
    popup.classList.remove('popup_show');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_show')
      closePopup(openedPopup);
    }
  }

function handleChangeInfo(evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;    
    profileDescribe.textContent = popupDescribe.value;
    closePopup(popupEdit);
}

function handleCreateNewCard(evt){
    evt.preventDefault();    
    renderCard({link:popupCardLink.value,name:popupCardName.value},placesSection)
    formAdd.reset();
    closePopup(popupAdd);
}

function handleCardClick(name, link){
    imagePopupPicture.src = link;
    imagePopupPicture.alt = name;
    captionPopupPicture.textContent = name;
    openPopup(popupPicture)

} 

function renderCard(data, wrap){
    const cardElement = new Card(data, '#places__card', handleCardClick);
    wrap.prepend(cardElement.generateCard());
}

function initPlaces(){
    initialCards.forEach(item => {
        renderCard(item,placesSection);
    });
}

editButton.addEventListener('click',() => {    
    popupName.value = profileName.textContent;
    popupDescribe.value = profileDescribe.textContent;
    openPopup(popupEdit);
    editValidator.clearFormfromErrors();
    
});

addButton.addEventListener('click',() => {
    formAdd.reset();
    openPopup(popupAdd)
    addValidator.clearFormfromErrors();
});

formEdit.addEventListener('submit', handleChangeInfo);
formAdd.addEventListener('submit', handleCreateNewCard);

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_show')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('icon_type_close')) {
          closePopup(popup)
        }     
    })
})


editValidator.enableValidation();
addValidator.enableValidation();
initPlaces();



