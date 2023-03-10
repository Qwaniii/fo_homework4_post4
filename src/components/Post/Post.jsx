import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import s from "./post.module.css";
import Tags from "../Tags/Tags";
import cn from "classnames";
import DelBtn from "../DelBtn/DelBtn";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function Post({ post, currentUser, onPostLike, postDelete, anchorEl , handleClick, handleClose }) {
  const isLike = post.likes.some((id) => id === currentUser._id);
  function handleLikeClick() {
    onPostLike(post);
  }
  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  return (
    // <Card sx={{ width: 250 }}>
    <Card className={s.post}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[100] }} aria-label="recipe">
            {post.author.avatar && (
              <img src={post.author.avatar} className={s.avatar}></img>
            )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <DelBtn postDelete={postDelete} user={currentUser} post={post} anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose}/>
          </IconButton>
        }
        title={post.author.name}
        subheader={post.created_at.slice(0, 10).split("-").reverse().join(".")}
      />
      <CardMedia
        className={s.image}
        component="img"
        height="194"
        image={post.image}
        alt="Paella dish"
      />
      <CardContent className={s.text} >
        <Typography variant="body2" color="text.secondary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {post.text.slice(0, 200)}{post.text.length > 200 ? "..." : ""}
          {/* {post.text} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={s.cardActions}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            onClick={handleLikeClick}
            className={cn({ [s.favorite]: isLike })}
          />
          {post.likes.length > 0 ? <span className={s.numbLike}>{post.likes.length}</span> : ""}
          
        </IconButton>
        <IconButton aria-label="share" className={s.icon}>
          {/* <ShareIcon /> */}
          {post.tags.length < 3 &&
            post.tags.map((tag, index) => <Tags tag={tag} key={index} />)}
          {post.tags.length >= 3 &&
            post.tags
              .map((tag, index) => <Tags tag={tag} key={index} />)
              .slice(0, 3)}
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            piment??n, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
