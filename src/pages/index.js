import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupConfirm from './components/PopupConfirm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import Api from './components/Api';
import { settings } from './utils/constants.js';
import { userInfoInputsSelectors } from './utils/constants.js';
import { userInfoSelectors } from './utils/constants.js';
import './pages/index.css';

const api = new Api({
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-22',
    headers: {
        authorization: 'de762cbe-88d6-41ba-9954-cf6c210b4eb0',
        'Content-Type': 'application/json'
    }
})



const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const editAvatarButton = document.querySelector('.profile__button_type_editPhoto');

const editValidator = new FormValidator(settings, document.querySelector('.popup_edit'));
const addValidator = new FormValidator(settings, document.querySelector('.popup_add'));
const editAvatarValidator = new FormValidator(settings, document.querySelector('.popup_changePhoto'));

const userInfo = new UserInfo(userInfoSelectors);

const popupEdit = new PopupWithForm({
    handleFormSubmit: (data) => {
        renderLoading(true, popupEdit)
        api.setUserData({
            handlerSuccess: (data) => {
                userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
            },
            handlerFinally: () => {
                renderLoading(false, popupEdit);
            }
        }, data.name, data.describe);

    }
}, '.popup_edit');

const popupAgree = new PopupConfirm('.popup_agree');

const popupAdd = new PopupWithForm({
    handleFormSubmit: (data) => {
        renderLoading(true, popupAdd)
        api.setCard({
            handlerFinally: () => {
                renderLoading(false, popupAdd);
            },
            handlerSuccess: (data) => {
                const cardElement = renderCard(data);
                section.addItem(cardElement.generateCard());
            }
        }, data.name, data.link)
    }
}, '.popup_add');

const popupEditAvatar = new PopupWithForm({
    handleFormSubmit: (data) => {
        renderLoading(true, popupEditAvatar)
        api.updateAvatar({
            handlerSuccess: (answer) => {
                userInfo.setImage(answer.avatar);
            },
            handlerFinally: () => {
                renderLoading(false, popupEditAvatar);
            },
        }, data.link)

    }
}, '.popup_changePhoto')

const popupImage = new PopupWithImage('.popup-image');

const section = new Section({
    items: [],
    renderer: (item) => {
        const cardElement = renderCard(item);
        section.addItem(cardElement.generateCard());
    }
}, '.places');






function handleCardClick(name, link) {    
    popupImage.open(name,link);
}

function handleRemoveClick(cardElement){
    popupAgree.open();    
    popupAgree.setEventOnSubmit({
        handlerFormSubmit: () => {                                
            api.removeCard(cardElement.id)
            cardElement.remove();
        }
    })
}

function handleDislikedCard(cardElement){
    api.disikedCard({
        handlerSuccess: (data) => {
            cardElement.setLike(data.likes.length);
        }
    }, cardElement.id)
}
function handleLikedCard(cardElement){
    api.likedCard({
        handlerSuccess: (data) => {
            cardElement.setLike(data.likes.length);
        }
    }, cardElement.id)
}

function getInitialUser(){
    return userInfo.getUserId()
}

function renderCard(dataItem){
    const cardElement = new Card(dataItem, '#places__card', handleCardClick, getInitialUser(),
    {
        handleLikedCard,
        handleDislikedCard,
        handleRemoveClick                     
    }
    )
    return cardElement
}

function renderLoading(isLoading, popup) {
    if (isLoading) {
        popup.setTextInButton('Сохранение...')
    }
    else {
        popup.setTextInButton('Сохранить')
    }
}

popupEdit.setEventListeners()
popupAdd.setEventListeners();;
popupEditAvatar.setEventListeners();
popupImage.setEventListeners();
popupAgree.setEventListeners();

editButton.addEventListener('click', () => {
    popupEdit.open();
    const currentUserData = userInfo.getUserInfo();
    popupEdit.popup.querySelector(userInfoInputsSelectors.nameSelector).value = currentUserData.name;
    popupEdit.popup.querySelector(userInfoInputsSelectors.describeSelector).value = currentUserData.describe;
    editValidator.clearFormfromErrors();
});

addButton.addEventListener('click', () => {
    popupAdd.open();
    addValidator.clearFormfromErrors();
});

editAvatarButton.addEventListener('click', () => {
    popupEditAvatar.open();
    editAvatarValidator.clearFormfromErrors();
})

api.getAllInitialInfo({handlerSuccess: (userData,cardsData)=>{    
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id)
    section.setItems(cardsData);
    section.renderer();
}});

editValidator.enableValidation();
addValidator.enableValidation();
editAvatarValidator.enableValidation();



