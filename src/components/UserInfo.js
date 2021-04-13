export default class UserInfo {
    constructor({ nameSelector, describeSelector, photoSelector, photoContainerSelector }) {
        this._nameSelector = nameSelector;
        this._describeSelector = describeSelector;
        this._photoSelector = photoSelector;
        this._photoContainerSelector = photoContainerSelector;
        this._image = document.createElement('img');
    }

    getUserInfo() {
        this._getDOMObject();
        const name = this._nameElement.textContent;
        const describe = this._describeElement.textContent;
        const photo = this._photoElement.src;

        return { name, describe, photo }
    }

    setUserInfo(name, describe, link, id) {
        this._getDOMObject();
        this._nameElement.textContent = name;
        this._describeElement.textContent = describe;
        this._userId = id;
        this._loadImage(link, this._imageLoadCallback.bind(this))
    }

    _getDOMObject() {
        this._nameElement = document.querySelector(this._nameSelector);
        this._describeElement = document.querySelector(this._describeSelector);
        this._photoElement = document.querySelector(this._photoSelector);
        this._containerElement = document.querySelector(this._photoContainerSelector);
    }

    _imageLoadCallback(evt) {
        this._containerElement.prepend(evt.target);
    }

    _loadImage(imageUrl, loadCallback) {
        this._image.src = imageUrl;
        this._image.alt = 'Фото профиля';
        this._image.classList.add('profile__photo');
        this._image.onload = loadCallback;
    }

    changeImage(newLink) {
        this._image.src = newLink;
    }
    getUserId(){
        return this._userId
    }
    

}