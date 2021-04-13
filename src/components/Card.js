class Card {
    constructor(data, cardSelector, handleCardClick, idCurrentUser, handleLiked) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this.id = data._id;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;     

        this._handleRemoveClick = handleLiked.handleRemoveClick;
        this._handleLikedCard = handleLiked.handleLikedCard;
        this._handleDislikedCard = handleLiked.handleDislikedCard;        

        this._handleLikeCard = this._handleLikeCard.bind(this);
        this._handleDislikeCard = this._handleDislikeCard.bind(this);        
        this._handleRemoveCard = this._handleRemoveCard.bind(this);
        this._idUser = idCurrentUser;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.places__card')
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeCard(evt) {
        this._handleLikedCard(this);
        evt.target.classList.add('places__like_activate');
        evt.target.removeEventListener('click', this._handleLikeCard);
        evt.target.addEventListener('click', this._handleDislikeCard);
    }
    _handleDislikeCard(evt) {
        this._handleDislikedCard(this);
        evt.target.classList.remove('places__like_activate');
        evt.target.removeEventListener('click', this._handleDislikeCard);
        evt.target.addEventListener('click', this._handleLikeCard);
    }
    _handleRemoveCard(){
        this._handleRemoveClick(this)
    }

    _setEventListeners() {
        if (this._isILiked){
            this._likeButton.addEventListener('click', this._handleDislikeCard);
        }
        else{
            this._likeButton.addEventListener('click', this._handleLikeCard);
        }
        
        if (this._isMyCard) {            
            this._deleteButton.addEventListener('click', this._handleRemoveCard);            
        }
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })
    }

    generateCard() {
        this._newCard = this._getTemplate();        
        this._isMyCard = this._isMyCard();
        this._isILiked = this._isILiked();
        this._likeButton = this._newCard.querySelector('.places__like');
        this._deleteButton = this._newCard.querySelector('.places__trash');
        if (!this._isMyCard) this._deleteButton.classList.add('places__trash_hide')
        if (this._isILiked) this._likeButton.classList.add('places__like_activate')
        this._photo = this._newCard.querySelector('.places__photo');
        this._nameCard = this._newCard.querySelector('.places__name');
        this._numberLikes = this._newCard.querySelector('.places__numberLikes');
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._numberLikes.textContent = this._likes.length;
        this._nameCard.textContent = this._name;
        this._setEventListeners();
        return this._newCard
    }
    setLike(numberLikes) {
        this._numberLikes.textContent = numberLikes;
    }

    remove() {
        this._newCard.remove();
    }

    _isMyCard(){ 
        if(this._idUser == this._ownerId) return true
        return false
    }
    _isILiked(){
        let checker = false;
        this._likes.forEach(user => {                       
            if (user._id == this._idUser) checker = true
        })        
        return checker
    }

}

export default Card