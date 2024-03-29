import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import s from "./search.module.css";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { nextPageAction } from "../../storage/reducers/paginateReducers";


export default function SearchAddPost({
  active,
  setActive,
  setSearchQuery,
  searchQuery,
  setPopupEdit
}) {

  const dispatch = useDispatch()

  const nextPage = (data) => {
    dispatch(nextPageAction(data))
  }

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value)
    nextPage(1)
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent className={s.search}>
        <Typography
          className={s.wrapper}
          sx={{ fontSize: 26 }}
          color="text.secondary"
          gutterBottom
        >
          <span className={s.title}>Социально-новостные посты</span>
          <input
            className={cn(s.input, { [s.active]: active })}
            type="text"
            placeholder="Поиск"
            value={active ? searchQuery : ""}
            onChange={(e) => handleSearchQuery(e)}
          ></input>
          {active && (
            <CloseOutlinedIcon
              className={s.searchIcon}
              onClick={(e) => {
                setActive(false);
                e.preventDefault();
                setSearchQuery("");
              }}
            />
          )}
          {!active && (
            <SearchOutlinedIcon
              className={s.searchIcon}
              onClick={() => setActive(true)}
            />
          )}
        </Typography>
        <div className={s.btn}>
          <Button size="small"  onClick={() => setPopupEdit(true)}>Новый пост</Button>
        </div>
      </CardContent>
    </Card>
  );
}
