export default class UserInfo{
    constructor({nameSelector, describeSelector}){
        this._nameSelector = nameSelector;
        this._describeSelector = describeSelector;       
    }

    getUserInfo(){
        this._getDOMObject();
        const name = this._nameElement.textContent;
        const describe = this._describeElement.textContent;

        return {name, describe}
    }

    setUserInfo(name,describe){
        this._getDOMObject();
        this._nameElement.textContent = name;
        this._describeElement.textContent = describe;
    }

    _getDOMObject(){
        this._nameElement = document.querySelector(this._nameSelector);
        this._describeElement = document.querySelector(this._describeSelector);
    }

}