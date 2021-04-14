import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);        
        this.imagePopupPicture = this.popup.querySelector('.popup-image__picture');
        this.captionPopupPicture = this.popup.querySelector('.popup-image__caption');
    }

    open(name,link){        
        super.open();         
        this.imagePopupPicture.src = link;
        this.imagePopupPicture.alt = name;
        this.captionPopupPicture.textContent = name;        
    }
}