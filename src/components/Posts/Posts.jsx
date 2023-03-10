import React from "react";
import Post from "../Post/Post";
import SearchAddPost from "../SearchAddPost/SearchAddPost";
import s from "./posts.module.css";

export default function Posts({
  posts,
  currentUser,
  onPostLike,
  active,
  setActive,
  postDelete,
  anchorEl,
  handleClick,
  handleClose,
  setSearchQuery,
  searchQuery,
}) {
  return (
    <main>
      <div className={s.posts}>
        <div className={s.container}>
          <SearchAddPost
            active={active}
            setActive={setActive}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          <div className={s.inner}>
            {posts
              .map((item, index) => (
                <Post
                  key={item._id}
                  currentUser={currentUser}
                  post={item}
                  onPostLike={onPostLike}
                  postDelete={postDelete}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  handleClick={handleClick}
                />
              ))
              .reverse()}
          </div>
        </div>
      </div>
    </main>
  );
}
