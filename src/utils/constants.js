const krim = new URL('../images/krim.jpg', import.meta.url);
const chelyabinsk = new URL('../images/chelyabinsk.jpg', import.meta.url);
const novgorod = new URL('../images/novgorod.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);
const kurgan = new URL('../images/kurgan.jpg', import.meta.url);
const volgrad = new URL('../images/volgrad.jpg', import.meta.url);



export const initialCards = [
    {
      name: 'Крым',
      link: krim
    },
    {
      name: 'Челябинская область',
      link: chelyabinsk
    },
    {
      name: 'Новгород',
      link: novgorod
    },
    {
      name: 'Байкал',
      link: baikal
    },
    {
      name: 'Курганская область',
      link: kurgan
    },
    {
      name: 'Волгоград',
      link: volgrad
    }
  ]; 

export const settings = {    formSelector: '.popup__form',
                        fieldSelector: '.popup__set',
                        inputSelector: '.popup__input',
                        submitButtonSelector: '.popup__button',
                        inactiveButtonClass: 'popup__button_inactive',
                        inputErrorClass: 'popup__input_type_error',
                        errorClass: 'popup__error_active'
                    }

export const userInfoInputsSelectors = {   nameSelector:'.popup__input_form_name', 
                                    describeSelector:'.popup__input_form_describe' 
                                };

export const userInfoSelectors = { nameSelector:'.profile__name', 
                            describeSelector:'.profile__describe' 
                          }; 