class Card{
    constructor(data, cardSelector, handleCardClick){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        const cardElement = document
                .querySelector(this._cardSelector)
                .content
                .querySelector('.places__card')
                .cloneNode(true);

        return cardElement;
    }

    _handleLikeCard(evt){
        evt.target.classList.toggle('places__like_activate');
    }

    _handleDeleteCard(evt){
        evt.target.closest('.places__card').remove();
    }

    _setEventListeners(){
        this._likeButton.addEventListener('click', this._handleLikeCard);
        this._deleteButton.addEventListener('click', this._handleDeleteCard);
        this._photo.addEventListener('click', () => {    
            this._handleCardClick(this._name, this._link)
        })        
    }

    generateCard(){
        this._newCard = this._getTemplate();
        this._likeButton = this._newCard.querySelector('.places__like');
        this._deleteButton = this._newCard.querySelector('.places__trash');
        this._photo = this._newCard.querySelector('.places__photo');
        this._nameCard = this._newCard.querySelector('.places__name');
        this._photo.src = this._link;
        this._photo.alt = this._name; 
        this._nameCard.textContent = this._name;
        this._setEventListeners();
        return  this._newCard
    }

}

export default Card