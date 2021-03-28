import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor({name, link}, popupSelector){
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open(){        
        super.open();
        this.imagePopupPicture = this.popup.querySelector('.popup-image__picture');
        this.captionPopupPicture = this.popup.querySelector('.popup-image__caption'); 
        this.imagePopupPicture.src = this._link;
        this.imagePopupPicture.alt = this._name;
        this.captionPopupPicture.textContent = this._name;
        super.setEventListeners();
    }
}