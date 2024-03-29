import React, { useContext, useState } from "react";
import api from "../../utils/Api";
import Notification from "../Notification/Notification";
import s from "./newpost.module.css";
import { PostsContext } from "../../Context/PostsContext";

export default function Newpost({
  setPopup,
  setSelectedTab,
  setVisiblePost
}) {

  const { setPosts, setMyPosts } = useContext(PostsContext)
  
  const backgroundImage = "https://ih1.redbubble.net/image.343726250.4611/flat,1000x1000,075,f.jpg"
  const [newPostData, setNewPostData] = useState({
    title: "",
    text: "",
    image: "",
    tags: null,
  });
  const [isError, setIsError]= useState("")

  function handleCreatePost(e, data) {
    e.preventDefault();
    for (let key in data) {
      if (!data[key]) delete data[key]
    }
    console.log(data);
    api.setNewPost(data)
        .then((res) => {
          console.log(res);
          setPosts(prevState => [...prevState, res])
          setMyPosts(prevState => [...prevState, res])
          setPopup(false);
          setSelectedTab("new")
          setVisiblePost(true)
        })
        .catch((err) =>{
          console.log(err.status)
          err.json()
            .then(data => {
              console.log(data)
              setIsError(data.message)
              setTimeout(() => {
                setIsError("")
              }, 5000)
            })
        });

  }
  
  return (
    <>
      <div className={s.container}>
        <h3>Создание поста</h3>
        <form
          className={s.form}
          onSubmit={(e) =>
            handleCreatePost(e, newPostData)
          }
        >
          <input
            type="text"
            placeholder="Заголовок поста"
            value={newPostData.title}
            onChange={(e) => {
              setNewPostData((prevState) => ({...prevState, title: e.target.value.toString()}));
            }}
            required
          ></input>
          <textarea
            name="descr"
            placeholder="Тест поста"
            value={newPostData.text}
            onChange={(e) => {
                setNewPostData((prevState) => ({...prevState, text: e.target.value.toString()}));
            }}
            required
          ></textarea>
          {/* <div className={s.imgWrapper}> */}
            <img className={s.image} src={newPostData.image || backgroundImage} alt={newPostData.title}></img>
          {/* </div> */}
          <input
            type="text"
            name="imgLink"
            placeholder="Ссылка на изображение"
            onChange={(e) => setNewPostData((prevState) => ({...prevState, image: (e.target.value.toString() || backgroundImage)}))}
          ></input>
          <input
            type="text"
            placeholder="Введите тэги, через запятую"
            defaultValue={newPostData?.tags?.join()}
            onChange={(e) =>
              setNewPostData((prevState) => ({...prevState, tags: e.target.value.replace(/\s/g, "").split(",")}))
            }
          ></input>
          <div className={s.footer}>
            <input className={s.btn} type="submit" value="Добавить пост"></input>
            <button className={s.btn} type="button" onClick={() => setPopup(false)}>Отмена</button>
          </div>
          <span className={s.close} onClick={() => setPopup(false)}>&times;</span>
        </form>
        {isError && <div className={s.notification}>
            <Notification title="Ошибка" text={isError} color={true}/>
        </div>}
      </div>
    </>
  );
}
