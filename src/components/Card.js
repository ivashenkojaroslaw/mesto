class Card {
    constructor(data, cardSelector, handleCardClick, isNewCard, handlerLiked) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes.length;
        this.id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._isNewCard = isNewCard;
        this._handleRemoveClick = handlerLiked.handleRemoveClick;
        this._handleLikedCard = handlerLiked.handleLikedCard;
        this._handleDislikedCard = handlerLiked.handleDislikedCard;
        this._handleLikeCard = this._handleLikeCard.bind(this);
        this._handledislikeCard = this._handledislikeCard.bind(this);
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
        this._handleLikedCard();
        evt.target.classList.add('places__like_activate');
        evt.target.removeEventListener('click', this._handleLikeCard);
        evt.target.addEventListener('click', this._handledislikeCard);
    }
    _handledislikeCard(evt) {
        this._handleDislikedCard();
        evt.target.classList.remove('places__like_activate');
        evt.target.removeEventListener('click', this._handledislikeCard);
        evt.target.addEventListener('click', this._handleLikeCard);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeCard);
        if (this._isNewCard) this._deleteButton.addEventListener('click', this._handleRemoveClick);
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })
    }

    generateCard() {
        this._newCard = this._getTemplate();
        this._likeButton = this._newCard.querySelector('.places__like');
        this._deleteButton = this._newCard.querySelector('.places__trash');
        if (!this._isNewCard) {
            this._deleteButton.classList.add('places__trash_hide')
        }
        this._photo = this._newCard.querySelector('.places__photo');
        this._nameCard = this._newCard.querySelector('.places__name');
        this._numberLikes = this._newCard.querySelector('.places__numberLikes');
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._numberLikes.textContent = this._likes;
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

}

export default Card