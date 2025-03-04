import { useEffect, useState } from "react";
import {
  createComment,
  createJob,
  deleteResource,
  getImageByResourceId,
  getResource,
  updateResource,
} from "../../../api";
import { useNavigate } from "react-router-dom";
import { extractIdFromHref, toString } from "../../../utils/String";
import MotorcycleHeader from "../MotorcycleHeader/MotorcycleHeader";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import SpecsTable from "../../Specs/Specs";
import Schedule from "../../Schedule/Schedule";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import Discussion from "../../Discussion/Discussion";

const GetMotorcycle: React.FC = () => {
  const location = useLocation();
  const { userHref: href } = useAuth();
  const motorcycleHref = `${location.pathname}`;
  const motorcycleId = extractIdFromHref(motorcycleHref);
  const [motorcycle, setMotorcycle] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [updateJob, setUpdateJob] = useState<any | null>(null);
  const [updateComment, setUpdateComment] = useState<any | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getMotorcycle = async () => {
      try {
        const response = await getResource(motorcycleHref);
        setMotorcycle(response.data);

        const images = await getImageByResourceId(motorcycleId!);
        setImages(
          images.data.map(
            (img: any) => `data:${img.mimeType};base64,${img.data}`
          )
        );
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch motorcycle!");
      }
    };

    getMotorcycle();
  }, [motorcycleId]);

  const handleDelete = async () => {
    try {
      await deleteResource(motorcycleHref);
      navigate("/stable");
    } catch (err) {
      setError("Failed to delete motorcycle!");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCreateJob = async (job: any) => {
    try {
      const stringId = toString(motorcycleId);
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

  const handleUpdateJob = (href: any) => {
    const job = motorcycle.jobs.find((job: any) => job.href === href);
    setUpdateJob(job);
  };

  const submitUpdateJob = async (href: string, updatedJob: any) => {
    try {
      const response = await updateResource(href, updatedJob);
      const jobs = motorcycle.jobs.map((job: any) =>
        job.href === href ? response.data : job
      );
      setMotorcycle({ ...motorcycle, jobs: jobs });
    } catch (err: any) {
      setError("Failed to edit job!");
    }
  };

  const handleDeleteJob = async (href: string) => {
    try {
      await deleteResource(href);
      const jobs = motorcycle.jobs.filter((job: any) => job.href !== href);
      setMotorcycle({ ...motorcycle, jobs: jobs });
    } catch (err: any) {
      setError("Failed to delete job!");
    }
  };

  const handleCreateComment = async (comment: any) => {
    try {
      const stringId = toString(motorcycleId);
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

  const handleUpdateComment = (href: string) => {
    const comment = motorcycle.comments.find(
      (comment: any) => comment.href === href
    );
    setUpdateComment(comment);
  };

  const submitUpdateComment = async (href: string, updatedComment: any) => {
    try {
      const response = await updateResource(href, updatedComment);
      const comments = motorcycle.comments.map((comment: any) =>
        comment.href === href ? response.data : comment
      );
      setMotorcycle({ ...motorcycle, comments: comments });
    } catch (err: any) {
      setError("Failed to edit comment!");
    }
  };

  const handleDeleteComment = async (href: string) => {
    try {
      await deleteResource(href);
      const comments = motorcycle.comments.filter(
        (comment: any) => comment.href !== href
      );
      setMotorcycle({ ...motorcycle, comments: comments });
    } catch (err: any) {
      setError("Failed to delete comment!");
    }
  };

  if (error) return <p>{error}</p>;
  if (!motorcycle) return <p>Loading...</p>;

  return (
    <div className="tws-details-container">
      <h1>Motorcycle Details</h1>
      <div>
        <MotorcycleHeader motorcycle={motorcycle} images={images} />

        {motorcycle.userHref === href && (
          <>
            <button
              className="tws-button-warning"
              onClick={() =>
                navigate(`/motorcycles/edit/${motorcycleId}`, {
                  state: { href: motorcycleHref },
                })
              }
            >
              Update
            </button>

            <button
              className="tws-button-danger"
              onClick={() => {
                setShowConfirmation(true);
              }}
            >
              Delete
            </button>
          </>
        )}

        {showConfirmation && (
          <ConfirmModal
            message="Are you sure you want to delete this motorcycle?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirmation(false)}
          />
        )}

        <SpecsTable specs={motorcycle.specs} />
      </div>

      <div>
        <Schedule
          motorcycleUserHref={motorcycle.userHref}
          jobs={motorcycle.jobs}
          onCreate={(job) => handleCreateJob(job)}
          onUpdate={(href) => handleUpdateJob(href)}
          onDelete={(href) => handleDeleteJob(href)}
          submitUpdateJob={(href, job) => submitUpdateJob(href, job)}
          updateJob={updateJob}
          setUpdateJob={setUpdateJob}
        />

        {href && (
          <>
            <Discussion
              motorcycleUserHref={motorcycle.userHref}
              comments={motorcycle.comments}
              onCreate={(comment) => handleCreateComment(comment)}
              onUpdate={(href) => handleUpdateComment(href)}
              onDelete={(href) => handleDeleteComment(href)}
              submitUpdateComment={(href, comment) =>
                submitUpdateComment(href, comment)
              }
              updateComment={updateComment}
              setUpdateComment={setUpdateComment}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GetMotorcycle;
