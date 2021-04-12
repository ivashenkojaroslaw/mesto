import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
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

const section = new Section({
    items: '',
    renderer: () => { }
}, '.places');


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
                userInfo.setUserInfo(data.name, data.about, data.avatar);
            },
            handlerFinally: () => {
                renderLoading(false, popupEdit); 
            }
        }, data.name, data.describe);
        
    }
}, '.popup_edit');

const popupAdd = new PopupWithForm({
    handleFormSubmit: (data) => {
        renderLoading(true, popupAdd)
        api.setCard({
            handlerFinally: () => {
                renderLoading(false, popupAdd); 
            },
            handlerSuccess: (data) => {
                const cardElement = new Card(data, '#places__card', handleCardClick, true,
                    {
                        handleLikedCard: () => {
                            api.likedCard({
                                handlerSuccess: (data) => {
                                    cardElement.setLike(data.likes.length);
                                }
                            }, cardElement.id)
                        },
                        handleDislikedCard: () => {
                            api.disikedCard({
                                handlerSuccess: (data) => {
                                    cardElement.setLike(data.likes.length);
                                }
                            }, cardElement.id)
                        },
                        handleRemoveClick: () => {
                            const popupAgree = new PopupWithForm({
                                handleFormSubmit: () => {
                                    api.removeCard(data._id)
                                    cardElement.remove();
                                }
                            }, '.popup__agree');
                            popupAgree.open()
                            popupAgree.setEventListeners()
                        }
                    });                
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
                userInfo.changeImage(answer.avatar);                
            },
            handlerFinally: () => {
                renderLoading(false, popupEditAvatar); 
            },
        }, data.link)

    }
}, '.popup_changePhoto')


api.getInitialCards({
    handlerSuccess: (data) => {
        const section = new Section({
            items: data,
            renderer: (item) => {
                const cardElement = new Card(item, '#places__card', handleCardClick, false,
                    {
                        handleLikedCard: () => {
                            api.likedCard({
                                handlerSuccess: (data) => {
                                    cardElement.setLike(data.likes.length);
                                }
                            }, cardElement.id)
                        },
                        handleDislikedCard: () => {
                            api.disikedCard({
                                handlerSuccess: (data) => {
                                    cardElement.setLike(data.likes.length);
                                }
                            }, cardElement.id)
                        }
                    });
                section.addItem(cardElement.generateCard());
            }
        }, '.places');
        section.renderer();
    }
})

api.getUserInfo({
    handlerSuccess: (data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar)
    }
})

function handleCardClick(name, link) {
    const popupImage = new PopupWithImage({ name, link }, '.popup-image');
    popupImage.open();
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

editValidator.enableValidation();
addValidator.enableValidation();
editAvatarValidator.enableValidation();



