export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  getInitialCards(handlers) {
    const _handlerSuccess = handlers.handlerSuccess;
    return fetch(`${this._baseURL}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        _handlerSuccess(data);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так`, err);
      })
  }

  getUserInfo(handlers) {
    const _handlerSuccess = handlers.handlerSuccess;
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        _handlerSuccess(data);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так`, err);
      })

  }

  setUserData(handlers, name, about) {
    const _handlerSuccess = handlers.handlerSuccess;
    const _handlerFinally = handlers.handlerFinally;
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        _handlerSuccess(data);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так`, err);
      })
      .finally(() => {
        _handlerFinally()
      })
  }

  removeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'de762cbe-88d6-41ba-9954-cf6c210b4eb0'
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(`Что-то пошло не так`, err);
      })
  }

  setCard(handlers, name, link) {
    const _handlerSuccess = handlers.handlerSuccess;
    const _handlerFinally = handlers.handlerFinally;
    fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'de762cbe-88d6-41ba-9954-cf6c210b4eb0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        _handlerSuccess(data)
      })
      .catch(err => {
        console.log(`Что-то пошло не так`, err);
      })
      .finally(() => {
        _handlerFinally();
      })
  }

  likedCard(handlers, cardId) {
    const _handlerSuccess = handlers.handlerSuccess;
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        _handlerSuccess(data);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так`, err);
      })
  }

  disikedCard(handlers, cardId) {
    const _handlerSuccess = handlers.handlerSuccess;
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        _handlerSuccess(data);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так`, err);
      })
  }

  updateAvatar(handlers, link) {
    const _handlerSuccess = handlers.handlerSuccess;
    const _handlerFinally = handlers.handlerFinally;
    fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: 'de762cbe-88d6-41ba-9954-cf6c210b4eb0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        _handlerSuccess(data)
      })
      .catch(err => {
        console.log(`Что-то пошло не так`, err);
      })
      .finally(() => {
        _handlerFinally()
      })
  }


}

