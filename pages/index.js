let editBtn = document.querySelector('.profile__button_type_edit');
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.popup__button_type_save');
let likeBtn = document.querySelectorAll('.places__like-button');

let profile__name = document.querySelector('.profile__name');
let profile__describe = document.querySelector('.profile__describe');

let popup = document.querySelector('.popup');
let popup__name = document.querySelector('.popup__input_form_name');
let popup__describe = document.querySelector('.popup__input_form_describe');


function popupInit(){
    popup.classList.toggle('popup_show');
    popup.classList.toggle('popup');
}

function changeInfo(evt){
    evt.preventDefault();
    profile__name.textContent = popup__name.value;    
    profile__describe.textContent = popup__describe.value;
    popupInit();
}

function showInfo(){
    popup__name.value = profile__name.textContent;
    popup__describe.value = profile__describe.textContent;
}

editBtn.addEventListener('click',function(){      
    popupInit();
    showInfo();
});
closeBtn.addEventListener('click',popupInit);
saveBtn.addEventListener('click',changeInfo);

/*
for (let i=0; i<likeBtn.length; i++){
    likeBtn[i].addEventListener('click',function(){
        let child = this.children[0];
        child.classList.toggle('icon_like-disable');
        child.classList.toggle('icon_like-activate');    
     })
}
*/


