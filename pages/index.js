const popupEdit = document.querySelector('.popup_edit');
const popupName = popupEdit.querySelector('.popup__input_form_name');
const popupDescribe = popupEdit.querySelector('.popup__input_form_describe');
const closeButtonPopupEdit= popupEdit.querySelector('.popup__close-btn');
const formEdit = document.querySelector('.popup__form_edit');


const popupAdd = document.querySelector('.popup_add');
const popupCardName = popupAdd.querySelector('.popup__input_form_card-name');
const popupCardLink = popupAdd.querySelector('.popup__input_form_card-link');
const closeButtonPopupAdd= popupAdd.querySelector('.popup__close-btn');
const formAdd = document.querySelector('.popup__form_add');

const popupPicture = document.querySelector('.popup-image');
const imagePopupPicture = popupPicture.querySelector('.popup-image__picture');
const captionPopupPicture =  popupPicture.querySelector('.popup-image__caption');
const closeButtonPopupPicture = popupPicture.querySelector('.popup-image__close-btn');

const editButton= document.querySelector('.profile__button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescribe = document.querySelector('.profile__describe');

const addButton = document.querySelector('.profile__button_type_add');
const placesSection = document.querySelector('.places');
const template = document.querySelector('#places__card').content;


function openPopup(popup){
    popup.classList.add('popup_show');
    document.addEventListener('keydown', handleClosePopupByEscape)
    document.addEventListener('click', handleClosePopupByOverlay)
}

function closePopup(popup){
    popup.classList.remove('popup_show'); 
    document.removeEventListener('keydown', handleClosePopupByEscape)
    document.removeEventListener('click', handleClosePopupByOverlay)
}

function renderCard(data, wrap){
    wrap.prepend(createPlacesCard(data));
}

function createPlacesCard(data){  
    const newCard = template.querySelector('.places__card').cloneNode(true);
    const likeButton = newCard.querySelector('.places__like');
    const deleteButton = newCard.querySelector('.places__trash');
    const photo = newCard.querySelector('.places__photo');
    photo.src = data.link;
    photo.alt = data.name;
    newCard.querySelector('.places__name').textContent = data.name;    
    photo.addEventListener('click',() => handleShowPopupPicture(data));
    likeButton.addEventListener('click',handleLikeCard);
    deleteButton.addEventListener('click',handleDeleteCard);

    return newCard
}

function initPlaces(){
    initialCards.forEach(item => {
        renderCard(item,placesSection);
    });
}

function clearFormfromErrors(popupElement,settings){
    const formElement = popupElement.querySelector('.popup__form');
    const formButton = popupElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
        hideInputError(formElement,inputElement,settings)
    })
    toggleButtonState(inputList,formButton,settings);
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

function handleDeleteCard(evt){
    evt.target.closest('.places__card').remove();
}

function handleLikeCard(evt){
    evt.target.classList.toggle('places__like_activate');
}


function handleShowPopupPicture(data){   
    imagePopupPicture.src = data.link;
    imagePopupPicture.alt = data.name;
    captionPopupPicture.textContent = data.name;
    openPopup(popupPicture);
}

function handleClosePopupByOverlay(evt){
    const currentOpenedPopup = document.querySelector('.popup_show');
    if (currentOpenedPopup){
        if (evt.target === currentOpenedPopup){
            closePopup(currentOpenedPopup)
        }
    }
}

function handleClosePopupByEscape(evt){
    const currentOpenedPopup = document.querySelector('.popup_show');
    if (currentOpenedPopup){
        if(evt.key === 'Escape') { 
            closePopup(currentOpenedPopup)
        }
    }
}


editButton.addEventListener('click',() => {    
    popupName.value = profileName.textContent;
    popupDescribe.value = profileDescribe.textContent;
    openPopup(popupEdit);
    clearFormfromErrors(popupEdit,settings)
});

addButton.addEventListener('click',() => {
    openPopup(popupAdd)
    clearFormfromErrors(popupAdd,settings)
});

formEdit.addEventListener('submit', handleChangeInfo);
formAdd.addEventListener('submit', handleCreateNewCard);

closeButtonPopupEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonPopupAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonPopupPicture.addEventListener('click', () => closePopup(popupPicture));



initPlaces();



