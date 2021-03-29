export default class Popup{
    constructor(popupSecelctor){
        this._popupSecelctor = popupSecelctor;
        this.popup = document.querySelector(this._popupSecelctor);
    }

    open(){
        this.popup.classList.add('popup_show');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
    
    close(){
        this.popup.classList.remove('popup_show');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    setEventListeners(){
        this.popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_show')) {
                this.close();
            }
            if (evt.target.classList.contains('icon_type_close')) {
                this.close();
            }     
        })
    }

    _handleEscClose(evt){        
        if (evt.key === 'Escape') {
            this.close();
        }
    }   
}