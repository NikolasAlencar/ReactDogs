import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = ({ id, commentsProps, single }) => {
  const [comments, setComments] = useState(() => commentsProps);

  const commentsSection = useRef(null);

  const { login } = useContext(UserContext);

  useEffect(
    () =>
      (commentsSection.current.scrollTop =
        commentsSection.current.scrollHeight),
    [comments]
  );

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comment} ${single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.ID}>
            <strong>
              {comment.comment_author}:<span>{comment.comment_content}</span>
            </strong>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm id={id} single={single} setComments={setComments} />
      )}
    </>
  );
};

export default PhotoComments;
