import { useEffect, useState } from "react";
import {
  getMotorcycle,
  createComment,
  updateComment,
  deleteComment,
  createJob,
  updateJob,
  deleteJob,
  getImageByResourceId,
  deleteMotorcycle,
} from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toString } from "../../../utils/String";
import "../../Comments/Comment.css";
import "./MotorcycleDetails.css";

// interface Props {
//   id: string;
//   name: string;
//   make: string;
//   model: string;
//   year: number;
//   mileage: number;
// }

const MotorcycleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState({ title: "", content: "" });
  const [editComment, setEditComment] = useState<any | null>(null);
  const [job, setJob] = useState({
    title: "",
    description: "",
    cost: 0,
    dueDate: "",
    dueMileage: 0,
  });
  const [editJob, setEditJob] = useState<any | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMotorcycle = async (id: string) => {
      try {
        const response = await getMotorcycle(id);
        setMotorcycle(response.data);

        const images = await getImageByResourceId(id);
        setImages(
          images.data.map(
            (img: any) => `data:${img.mimeType};base64,${img.data}`
          )
        );
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch motorcycle!");
      }
    };

    const stringId = toString(id);
    if (stringId) {
      fetchMotorcycle(stringId);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteMotorcycle(id!);
      navigate("/stable");
    } catch (err) {
      setError("Failed to delete motorcycle!");
    } finally {
      setShowConfirmation(false);
    }
  };

  const toggleTable = () => setIsExpanded(!isExpanded);

  const handleCommentInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.title || !comment.content) {
      setError("Both title and content are required!");
      return;
    }

    try {
      const stringId = toString(id);
      if (stringId) {
        const response = await createComment(stringId, comment);
        setMotorcycle({
          ...motorcycle,
          comments: [...motorcycle.comments, response.data],
        });

        setComment({ title: "", content: "" });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to post comment!");
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !job.title ||
      !job.description ||
      !job.cost ||
      !job.dueDate ||
      !job.dueMileage
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      const stringId = toString(id);
      if (stringId) {
        const response = await createJob(stringId, job);
        setMotorcycle({
          ...motorcycle,
          jobs: [...motorcycle.jobs, response.data],
        });

        setJob({
          title: "",
          description: "",
          cost: 0,
          dueDate: "",
          dueMileage: 0,
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create job!");
    }
  };

  const handleEditComment = (id: string) => {
    const commentToEdit = motorcycle.comments.find(
      (comment: any) => comment.id === id
    );
    setEditComment(commentToEdit);
  };

  const handleEditJob = (id: any) => {
    const jobToEdit = motorcycle.jobs.find((job: any) => job.id === id);
    setEditJob(jobToEdit);
  };

  const submitEditComment = async (id: string, updatedComment: any) => {
    try {
      const response = await updateComment(id, updatedComment);
      const comments = motorcycle.comments.map((comment: any) =>
        comment.id === id ? response.data : comment
      );
      setMotorcycle({ ...motorcycle, comments: comments });
      setEditComment(null);
    } catch (err: any) {
      setError("Failed to edit comment!");
    }
  };

  const submitEditJob = async (id: string, updatedJob: any) => {
    try {
      const response = await updateJob(id, updatedJob);
      const jobs = motorcycle.jobs.map((job: any) =>
        job.id === id ? response.data : job
      );

      setMotorcycle({ ...motorcycle, jobs: jobs });
      setEditJob(null);
    } catch (err: any) {
      setError("Failed to edit job!");
    }
  };

  const handleDeleteComment = async (id: string) => {
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

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob(id);
      const jobs = motorcycle.jobs.filter((job: any) => job.id !== id);
      setMotorcycle({ ...motorcycle, jobs: jobs });
    } catch (err: any) {
      setError("Failed to delete job!");
    }
  };

  if (error) return <p>{error}</p>;
  if (!motorcycle) return <p>Loading...</p>;

  if (editComment) {
    return (
      <div>
        <h2>Edit Comment</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditComment(editComment.id, editComment);
          }}
        >
          <input
            type="text"
            value={editComment.title}
            onChange={(e) =>
              setEditComment({ ...editComment, title: e.target.value })
            }
          />
          <textarea
            value={editComment.content}
            onChange={(e) =>
              setEditComment({ ...editComment, content: e.target.value })
            }
          />
          <button type="submit">Save</button>
        </form>
        <button onClick={() => setEditComment(null)}>Cancel</button>
      </div>
    );
  }

  if (editJob) {
    return (
      <div>
        <h2>Edit Job</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditJob(editJob.id, editJob);
          }}
        >
          <input
            type="text"
            value={editJob.title}
            onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
          />
          <textarea
            value={editJob.description}
            onChange={(e) =>
              setEditJob({ ...editJob, description: e.target.value })
            }
          />
          <input
            type="number"
            value={editJob.cost}
            onChange={(e) => setEditJob({ ...editJob, cost: e.target.value })}
          />
          <input
            type="date"
            value={editJob.dueDate}
            onChange={(e) =>
              setEditJob({ ...editJob, dueDate: e.target.value })
            }
          />
          <input
            type="number"
            value={editJob.dueMileage}
            onChange={(e) =>
              setEditJob({ ...editJob, dueMileage: e.target.value })
            }
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {images.length > 0 && (
        <img src={images[0]} alt="Motorcycle" style={{ maxWidth: "100%" }} />
      )}
      <h1>{motorcycle.name}</h1>
      <p>{motorcycle.make}</p>
      <p>{motorcycle.model}</p>
      <p>{motorcycle.year}</p>
      <p>{motorcycle.mileage}</p>
      <p>{motorcycle.owner}</p>

      <button onClick={() => navigate(`/motorcycles/edit/${motorcycle.id}`)}>
        Update
      </button>

      <button onClick={() => setShowConfirmation(true)}>Delete</button>

      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this motorcycle?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}

      <div>
        <h2
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Specifications
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
        <button onClick={toggleTable}>
          {!isExpanded ? "Expand" : "Compact"}
        </button>
      </div>

      <div>
        <h2>Maintenance Schedule</h2>
        <ul>
          {motorcycle.jobs.map((job: any) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Cost: {job.cost}</p>
              <p>Due Date: {job.dueDate}</p>
              <p>Due Mileage: {job.dueMileage}</p>
              <button onClick={() => handleEditJob(job.id)}>Edit</button>
              <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add Job</h2>
        <form onSubmit={handleJobSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleJobInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleJobInputChange}
            required
          />
          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={job.cost}
            onChange={handleJobInputChange}
            required
          />
          <input
            type="date"
            name="dueDate"
            value={job.dueDate}
            onChange={handleJobInputChange}
          />
          <input
            type="number"
            name="dueMileage"
            placeholder="Due Mileage"
            value={job.dueMileage}
            onChange={handleJobInputChange}
          />
          <button type="submit">Create Job</button>
        </form>
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
              value={comment.title}
              onChange={handleCommentInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={comment.content}
              onChange={handleCommentInputChange}
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

export default MotorcycleDetails;
