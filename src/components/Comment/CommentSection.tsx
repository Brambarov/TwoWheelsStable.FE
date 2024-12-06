import React, { useState } from "react";

const CommentsSection: React.FC<{
  comments: any[];
  onCreate: (comment: any) => void;
  onEdit: (comment: any) => void;
  onDelete: (id: string) => void;
}> = ({ comments, onCreate, onEdit, onDelete }) => {
  const [comment, setComment] = useState({ title: "", content: "" });
  const [editComment, setEditComment] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
    onEdit(editComment);
    setIsEditing(false);
    setEditComment({ id: "", title: "", content: "" });
  };

  return (
    <div>
      <div>
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

      <div>
        <h2>{isEditing ? "Edit Comment" : "Add Comment"}</h2>
        <form onSubmit={isEditing ? handleEditComment : handleCreateComment}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={isEditing ? editComment.title : comment.title}
              onChange={(e) =>
                isEditing
                  ? setEditComment({
                      ...editComment,
                      [e.target.name]: e.target.value,
                    })
                  : handleCommentInputChange
              }
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={isEditing ? editComment.content : comment.content}
              onChange={(e) =>
                isEditing
                  ? setEditComment({
                      ...editComment,
                      [e.target.name]: e.target.value,
                    })
                  : handleCommentInputChange
              }
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

export default CommentsSection;
