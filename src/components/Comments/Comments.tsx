import { useAuth } from "../../context/AuthContext";
import React, { useEffect, useState } from "react";

const Comments: React.FC<{
  comments: any[];
  onCreate: (comment: any) => void;
  onUpdate: (comment: any) => void;
  onDelete: (href: string) => void;
  submitUpdateComment: (href: string, comment: any) => void;
  updateComment: any;
  setUpdateComment: any;
}> = ({
  comments,
  onCreate,
  onUpdate: onEdit,
  onDelete,
  submitUpdateComment: submitUpdateComment,
  updateComment: updateComment,
  setUpdateComment: setUpdateComment,
}) => {
  const [comment, setComment] = useState({ title: "", content: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const { userHref: href } = useAuth();

  useEffect(() => {
    if (updateComment) {
      setComment({
        title: updateComment.title,
        content: updateComment.content,
      });
      setIsUpdating(true);
    } else {
      setComment({ title: "", content: "" });
      setIsUpdating(false);
    }
  }, [updateComment]);

  const handleCommentInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComment((comment) => ({
      ...comment,
      [name]: value,
    }));
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(comment);
    setComment({
      title: "",
      content: "",
    });
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    submitUpdateComment(updateComment.href, comment);
    setUpdateComment(null);
  };

  return (
    <div className="tws-section-container">
      <div className="tws-section-list">
        <h2>Comments</h2>
        <ul className="tws-comments-container">
          {comments.map((comment: any) => (
            <li key={comment.href} className="tws-comment-item">
              <h3 className="tws-comment-title">{comment.title}</h3>
              <p className="tws-comment-content">{comment.content}</p>
              <p className="tws-comment-footer">
                by {comment.userName} on {comment.createdOn}
              </p>

              {comment.userHref === href && (
                <>
                  <div className="tws-comment-action">
                    <button
                      className="tws-button-submit"
                      onClick={() => onEdit(comment.href)}
                    >
                      Edit
                    </button>
                    <button
                      className="tws-button-submit"
                      onClick={() => onDelete(comment.href)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="tws-form-container">
        <h2>{isUpdating ? "Edit Comment" : "Add Comment"}</h2>

        <form
          className="tws-form"
          onSubmit={isUpdating ? handleUpdateComment : handleCreateComment}
        >
          <div className="tws-form-group">
            Title
            <input
              type="text"
              id="title"
              name="title"
              value={comment.title}
              onChange={handleCommentInputChange}
              required
            />
            Content
            <textarea
              id="content"
              name="content"
              value={comment.content}
              onChange={handleCommentInputChange}
              required
            />
          </div>

          <button className="tws-button-submit" type="submit">
            {isUpdating ? "Save Changes" : "Submit Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
