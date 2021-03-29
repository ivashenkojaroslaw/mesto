import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {initialCards} from '../utils/constants.js';
import {settings} from '../utils/constants.js';
import {userInfoInputsSelectors} from '../utils/constants.js';
import {userInfoSelectors} from '../utils/constants.js';
import './index.css';


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



