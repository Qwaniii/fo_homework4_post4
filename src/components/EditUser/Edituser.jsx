import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import api from "../../utils/Api";
import s from "./edituser.module.css";

export default function Edituser({ setPopup, setVisibleUser }) {
  
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [avatarUser, setAvatarUser] = useState({avatar: currentUser.avatar});
  const [userObj, setUserObj] = useState({name: currentUser.name, about: currentUser.about})
  const backgroundImage = "https://www.sundayairlines.kz/local/frontend/dist/img/no_pic.24654b31.jpg"



  function handleEditUserInfo(e, data, avatar) {
    e.preventDefault();
    api
      .editUserDataInfo(data)
      .then((resp) => {
        console.log("data",resp);
        api
          .editUserAvatar(avatar)
          .then((resp) => {
            console.log("avatar", resp)
            setCurrentUser(resp)
            setVisibleUser(true)
            setPopup(false)

          })
          .catch((err) => alert("Ошибка, неправильный формат аватара", err));
      })
      .catch((err) => alert("Ошибка редактирования учетной записи",err));
  }

  return (
    <div className={s.container}>
      <h3>Изменение данных</h3> 
      <form className={s.formUser} onSubmit={(e) => {
        handleEditUserInfo(e, userObj, avatarUser)}
        }>
        <div className={s.imgwrapper}><img className={s.image} src={avatarUser.avatar || backgroundImage} alt={userObj.name}></img></div>
        <span className={s.main}>
          <label htmlFor="img">Аватар:</label>
          <input
            type="text"
            id="img"
            name="imgLink"
            placeholder="Ссылка на изображение"
            value={avatarUser.avatar}
            onChange={(e) => {
              setAvatarUser((prevState) => ({...prevState, avatar: e.target.value.toString()}));
            }}
          ></input>
        </span>
        <span className={s.main}><label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          placeholder="Имя"
          value={userObj.name}
          onChange={(e) => {
            setUserObj((prevState) => ({...prevState, name: e.target.value.toString()}));
          }}
          required
        ></input></span>
        <span className={s.main}><label htmlFor="about">Инфо:</label>
        <input
          type="text"
          id="about"
          placeholder="Обо мне"
          value={userObj.about}
          onChange={(e) => {
            setUserObj((prevState) => ({...prevState, about: e.target.value.toString()}));
          }}
          required
        ></input></span>
        <span className={s.main}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="E-email"
            value={currentUser.email}
            disabled
          ></input>
        </span>
        <div className={s.footer}>
          <input className={s.btn} type="submit" value="Сохранить"></input>
          <button className={s.btn} type="button" onClick={() => setPopup(false)}>Отмена</button>
        </div>
        <span className={s.close} onClick={() => setPopup(false)}>&times;</span>
      </form>
    </div>
  );
}
