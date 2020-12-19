let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.popup__save-btn');
let likeBtn = document.querySelectorAll('.places__like-button');

function changeInfo(evt){
    evt.preventDefault();
    document.querySelector('.profile__name').innerHTML = document.querySelector('.popup__name').value;
    document.querySelector('.profile__describe').innerHTML = document.querySelector('.popup__describe').value;
    document.querySelector('.popup').style.display = 'none';
}

editBtn.addEventListener('click',function(){
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup__name').value = document.querySelector('.profile__name').innerHTML;
    document.querySelector('.popup__describe').value = document.querySelector('.profile__describe').innerHTML;
});

closeBtn.addEventListener('click',function(){
    document.querySelector('.popup').style.display = 'none';
});

for (let i=0; i<likeBtn.length; i++){
    likeBtn[i].addEventListener('click',function(){
        this.children[0].classList.toggle('icon_like-disable');
        this.children[0].classList.toggle('icon_like-activate');    
     })
}

saveBtn.addEventListener('click',changeInfo);

