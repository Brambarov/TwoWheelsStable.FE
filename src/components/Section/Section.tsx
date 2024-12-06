import "./Section.css";
import React, { useEffect, useState } from "react";

const Section: React.FC<{
  comments: any[];
  onCreate: (comment: any) => void;
  onEdit: (comment: any) => void;
  onDelete: (id: string) => void;
  submitEditComment: (id: string, comment: any) => void;
  editComment: any;
  setEditComment: any;
}> = ({
  comments,
  onCreate,
  onEdit,
  onDelete,
  submitEditComment,
  editComment,
  setEditComment,
}) => {
  const [comment, setComment] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editComment) {
      setComment({ title: editComment.title, content: editComment.content });
      setIsEditing(true);
    } else {
      setComment({ title: "", content: "" });
      setIsEditing(false);
    }
  }, [editComment]);

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

  const handleEditComment = async (e: React.FormEvent) => {
    e.preventDefault();
    submitEditComment(editComment.id, comment);
    setEditComment(null);
  };

  return (
    <div className="comments-container-wrapper">
      <div className="comments-list">
        <h2>Comments</h2>
        <ul className="comments-container">
          {comments.map((comment: any) => (
            <li key={comment.id} className="comment-item">
              <h3 className="comment-title">{comment.title}</h3>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-footer">
                by {comment.createdBy} on {comment.createdOn}
              </p>
              <div className="comment-action">
                <button onClick={() => onEdit(comment.id)}>Edit</button>
                <button onClick={() => onDelete(comment.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="comment-form">
        <h2>{isEditing ? "Edit Comment" : "Add Comment"}</h2>
        <form onSubmit={isEditing ? handleEditComment : handleCreateComment}>
          <div>
            Title
            <input
              type="text"
              id="title"
              name="title"
              value={comment.title}
              onChange={handleCommentInputChange}
              required
            />
          </div>
          <div>
            Content
            <textarea
              id="content"
              name="content"
              value={comment.content}
              onChange={handleCommentInputChange}
              required
            />
          </div>
          <button type="submit">
            {isEditing ? "Save Changes" : "Submit Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Section;
