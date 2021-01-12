let editBtn = document.querySelector('.profile__button_type_edit');
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.popup__button');
let likeBtn = document.querySelectorAll('.places__like-button');
let placesSection = document.querySelector('.places');

const initialCards = [
    {
      name: 'Карачаевск',
      link: 'images/karachaevsk.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'images/chelyabinsk.jpg'
    },
    {
      name: 'Эльбрус',
      link: 'images/Elbrus.png'
    },
    {
      name: 'Домбай',
      link: 'images/dombay.png'
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

let popup = document.querySelector('.popup');
let popup__name = document.querySelector('.popup__input_form_name');
let popup__describe = document.querySelector('.popup__input_form_describe');


function hidePopup(){
    popup.classList.remove('popup_show');
}
function showPopup(){
    popup.classList.add('popup_show');    
    popup__name.value = profile__name.textContent;
    popup__describe.value = profile__describe.textContent;
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

    return newCard
}

function initPlaces(){
    initialCards.forEach(item => {
        let card = createPlacesCard(item.link,item.name);
        placesSection.append(card);
    });
}

editBtn.addEventListener('click',showPopup);
closeBtn.addEventListener('click',hidePopup);
saveBtn.addEventListener('click',changeInfo);
initPlaces();
/*
for (let i=0; i<likeBtn.length; i++){
    likeBtn[i].addEventListener('click',function(){
        let child = this.children[0];
        child.classList.toggle('icon_like-disable');
        child.classList.toggle('icon_like-activate');    
     })
}
*/


