import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import {initialCards} from '../scripts/initial-сards.js';

const settings = {  formSelector: '.popup__form',
                    fieldSelector: '.popup__set',
                    inputSelector: '.popup__input',
                    submitButtonSelector: '.popup__button',
                    inactiveButtonClass: 'popup__button_inactive',
                    inputErrorClass: 'popup__input_type_error',
                    errorClass: 'popup__error_active'
                }

const userInfoInputsSelectors = { nameSelector:'.popup__input_form_name', 
                                  describeSelector:'.popup__input_form_describe' 
                                };
const userInfoSelectors = { nameSelector:'.profile__name', 
                            describeSelector:'.profile__describe' 
                          };

const editButton= document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const editValidator = new FormValidator(settings, document.querySelector('.popup_edit'));
const addValidator = new FormValidator(settings, document.querySelector('.popup_add'));

const userInfo = new UserInfo(userInfoSelectors);

const section = new Section({items:initialCards,
    renderer: (item) => {
        const cardElement = new Card(item, '#places__card', handleCardClick);
        section.addItem(cardElement.generateCard());
    }},'.places')

const popupEdit = new PopupWithForm({
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data.name,data.describe);
    }
}, '.popup_edit');

const popupAdd = new PopupWithForm({
    handleFormSubmit: (data) => {
        const cardElement = new Card(data, '#places__card', handleCardClick);
        section.addItem(cardElement.generateCard());
    }
}, '.popup_add');

function handleCardClick(name, link){
    const popupImage = new PopupWithImage({name, link},'.popup-image');
    popupImage.open();
} 


popupEdit.setEventListeners();
popupAdd.setEventListeners();

editButton.addEventListener('click',() => {  
    popupEdit.open();
    const currentUserData = userInfo.getUserInfo();
    popupEdit.fillForm(userInfoInputsSelectors,currentUserData);   
    editValidator.clearFormfromErrors();    
});

addButton.addEventListener('click',() => {
    popupAdd.open();    
    addValidator.clearFormfromErrors();
});

editValidator.enableValidation();
addValidator.enableValidation();
section.renderer();



