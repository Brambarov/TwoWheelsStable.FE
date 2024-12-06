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
import "../../Comment/Comment.css";
import "./MotorcycleDetails.css";
import MotorcycleHeader from "../MotorcycleHeader/MotorcycleHeader";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import SpecsTable from "../../Specs/SpecsTable/SpecsTable";
import Schedule from "../../Schedule/Schedule";
import Section from "../../Section/Section";

const MotorcycleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [editComment, setEditComment] = useState<any | null>(null);
  const [editJob, setEditJob] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

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

  const handleCreateComment = async (comment: any) => {
    try {
      const stringId = toString(id);
      if (stringId) {
        const response = await createComment(stringId, comment);
        setMotorcycle({
          ...motorcycle,
          comments: [...motorcycle.comments, response.data],
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to post comment!");
    }
  };

  const handleCreateJob = async (job: any) => {
    try {
      const stringId = toString(id);
      if (stringId) {
        const response = await createJob(stringId, job);
        setMotorcycle({
          ...motorcycle,
          jobs: [...motorcycle.jobs, response.data],
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create job!");
    }
  };

  const handleEditComment = (id: string) => {
    const comment = motorcycle.comments.find(
      (comment: any) => comment.id === id
    );
    setEditComment(comment);
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
      <div>
        <MotorcycleHeader motorcycle={motorcycle} images={images} />

        <button onClick={() => navigate(`/motorcycles/edit/${motorcycle.id}`)}>
          Update
        </button>

        <button onClick={() => setShowConfirmation(true)}>Delete</button>

        {showConfirmation && (
          <ConfirmModal
            message="Are you sure you want to delete this motorcycle?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>

      <SpecsTable specs={motorcycle.specs} />

      <Schedule
        jobs={motorcycle.jobs}
        onCreate={(job) => handleCreateJob(job)}
        onEdit={(id) => handleEditJob(id)}
        onDelete={(id) => handleDeleteJob(id)}
      />

      <Section
        comments={motorcycle.comments}
        motorcycleId={motorcycle.id}
        onCreate={(comment) => handleCreateComment(comment)}
        onEdit={(id) => handleEditComment(id)}
        onDelete={(id) => handleDeleteComment(id)}
        submitEditComment={(id, comment) => submitEditComment(id, comment)}
        editComment={editComment}
        setEditComment={setEditComment}
      />
    </div>
  );
};

export default MotorcycleDetails;
