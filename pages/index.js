let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.popup__save-btn');
let likeBtn = document.querySelectorAll('.places__like-button');

function changeInfo(evt){
    evt.preventDefault();
    let profile__name = document.querySelector('.profile__name')
    let popup__name = document.querySelector('.popup__name');
    let profile__describe = document.querySelector('.profile__describe');
    let popup__describe = document.querySelector('.popup__describe');
    let popup = document.querySelector('.popup');

    profile__name.innerHTML = popup__name.value;    
    profile__describe.innerHTML = popup__describe.value;
    popup.style.display = 'none';
}

editBtn.addEventListener('click',function(){
    let popup = document.querySelector('.popup');
    let profile__name = document.querySelector('.profile__name')
    let popup__name = document.querySelector('.popup__name');
    let profile__describe = document.querySelector('.profile__describe');
    let popup__describe = document.querySelector('.popup__describe');
    popup.style.display = 'flex';
    popup__name.value = profile__name.innerHTML;
    popup__describe.value = profile__describe.innerHTML;
});

closeBtn.addEventListener('click',function(){
    let popup = document.querySelector('.popup');
    popup.style.display = 'none';
});

for (let i=0; i<likeBtn.length; i++){
    likeBtn[i].addEventListener('click',function(){
        let child = this.children[0];
        child.classList.toggle('icon_like-disable');
        child.classList.toggle('icon_like-activate');    
     })
}

saveBtn.addEventListener('click',changeInfo);

