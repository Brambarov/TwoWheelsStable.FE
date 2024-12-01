import { useEffect, useState } from "react";
import {
  getMotorcycleById,
  createComment,
  updateComment,
  deleteComment,
} from "../../api";
import { useParams } from "react-router-dom";
import { toNumber } from "../../utils/Number";
import { toString } from "../../utils/String";
import "../Comments/Comment.css";
import "./Details.css";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState({ title: "", content: "" });
  const [editingComment, setEditingComment] = useState<any | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMotorcycle = async (id: number) => {
      try {
        const response = await getMotorcycleById(id);
        setMotorcycle(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch motorcycle!");
      }
    };

    const numId = toNumber(id);
    if (numId) {
      fetchMotorcycle(numId);
    }
  }, [id]);

  const toggleTable = () => setIsExpanded(!isExpanded);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.title || !newComment.content) {
      setError("Both title and content are required!");
      return;
    }

    try {
      const numId = toNumber(id);
      if (numId) {
        const response = await createComment(numId, newComment);
        setMotorcycle({
          ...motorcycle,
          comments: [...motorcycle.comments, response.data],
        });

        setNewComment({ title: "", content: "" });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to post comment!");
    }
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = motorcycle.comments.find(
      (comment: any) => comment.id === id
    );
    setEditingComment(commentToEdit);
  };

  const submitEditComment = async (id: number, updatedComment: any) => {
    try {
      const response = await updateComment(id, updatedComment);
      const comments = motorcycle.comments.map((comment: any) =>
        comment.id === id ? response.data : comment
      );
      setMotorcycle({ ...motorcycle, comments: comments });
      setEditingComment(null);
    } catch (err: any) {
      setError("Failed to edit comment!");
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);
      const comments = motorcycle.comments.filter(
        (comment: any) => comment.id !== id
      );
      setMotorcycle({ ...motorcycle, comments: comments });
    } catch (err: any) {
      setError("Failed to delete comment!");
    }
  };

  if (error) return <p>{error}</p>;
  if (!motorcycle) return <p>Loading...</p>;

  if (editingComment) {
    return (
      <div>
        <h2>Edit Comment</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditComment(editingComment.id, editingComment);
          }}
        >
          <input
            type="text"
            value={editingComment.title}
            onChange={(e) =>
              setEditingComment({ ...editingComment, title: e.target.value })
            }
          />
          <textarea
            value={editingComment.content}
            onChange={(e) =>
              setEditingComment({ ...editingComment, continue: e.target.value })
            }
          />
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setEditingComment(null)}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{motorcycle.name}</h1>
      <p>{motorcycle.make}</p>
      <p>{motorcycle.model}</p>
      <p>{motorcycle.year}</p>
      <p>{motorcycle.mileage}</p>
      <p>{motorcycle.owner}</p>

      <div>
        <h2
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Specifications
          <button onClick={toggleTable}>
            {!isExpanded ? "Expand" : "Compact"}
          </button>
        </h2>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(motorcycle.specs)
              .slice(0, isExpanded ? motorcycle.specs.length : 5)
              .map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{toString(value)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Maintenance Schedule</h2>
        <ul>
          {motorcycle.schedule.map((job: any) => (
            <li key={job.id}>
              {job.name} - {job.dueDate}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add Comment</h2>
        <form onSubmit={handleCommentSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newComment.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={newComment.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit Comment</button>
        </form>
        {error && <p>{error}</p>}
      </div>

      <div>
        <h2>Comments</h2>
        <ul className="comments-container">
          {motorcycle.comments.map((comment: any) => (
            <li key={comment.id} className="comment-item">
              <h3 className="comment-title">{comment.title}</h3>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-footer">
                by {comment.createdBy} on {comment.createdOn}
              </p>
              <div className="comment-action">
                <button onClick={() => handleEditComment(comment.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Details;
