export default class UserInfo {
    constructor({ nameSelector, describeSelector, photoSelector, photoContainerSelector }) {
        this._nameSelector = nameSelector;
        this._describeSelector = describeSelector;
        this._photoSelector = photoSelector;
        this._photoContainerSelector = photoContainerSelector;
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
        this._photoElement.src = link;
    }

    _getDOMObject() {
        this._nameElement = document.querySelector(this._nameSelector);
        this._describeElement = document.querySelector(this._describeSelector);
        this._photoElement = document.querySelector(this._photoSelector);
        this._containerElement = document.querySelector(this._photoContainerSelector);
    }  

    setImage(newLink) {
        this._photoElement.src = newLink;
    }
    getUserId(){
        return this._userId
    }
}