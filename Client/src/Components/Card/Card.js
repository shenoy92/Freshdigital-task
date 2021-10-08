import styles from './card.module.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

const Card = ({img, likes, likeThePost}) => {
    return (
        <div className={styles.card}>
            <img src={img}/>
            <button onClick={likeThePost}><Likes likes={likes}/></button>
        </div>
    )
}

const Likes = ({ likes }) => {
    if (likes?.length > 0) {
      return likes.find((like) => like === localStorage.getItem('auth'))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};

export default Card
