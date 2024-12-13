import { useAuth } from "../../context/AuthContext";
import "./Schedule.css";
import { useEffect, useState } from "react";

const Schedule: React.FC<{
  motorcycleUserHref: string;
  jobs: any[];
  onCreate: (job: any) => void;
  onUpdate: (href: string) => void;
  onDelete: (href: string) => void;
  submitUpdateJob: (href: string, job: any) => void;
  updateJob: any;
  setUpdateJob: any;
}> = ({
  motorcycleUserHref,
  jobs,
  onCreate,
  onUpdate: onEdit,
  onDelete,
  submitUpdateJob: submitUpdateJob,
  updateJob: updateJob,
  setUpdateJob: setUpdateJob,
}) => {
  const { userHref: href } = useAuth();
  const [job, setJob] = useState({
    title: "",
    description: "",
    cost: 0,
    dueDate: "",
    dueMileage: 0,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (updateJob) {
      setJob({
        title: updateJob.title,
        description: updateJob.description,
        cost: updateJob.cost,
        dueDate: updateJob.dueDate,
        dueMileage: updateJob.dueMileage,
      });
      setIsUpdating(true);
    } else {
      setJob({
        title: "",
        description: "",
        cost: 0,
        dueDate: "",
        dueMileage: 0,
      });
      setIsUpdating(false);
    }
  }, [updateJob]);

  const handleJobInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJob((job) => ({ ...job, [name]: value }));
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(job);
    setJob({
      title: "",
      description: "",
      cost: 0,
      dueDate: "",
      dueMileage: 0,
    });
  };

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    submitUpdateJob(updateJob.href, job);
    setUpdateJob(null);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-list">
        <h2>Maintenance Schedule</h2>
        <ul>
          {jobs.map((job: any) => (
            <li key={job.href}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Cost: {job.cost}</p>
              <p>Due Date: {job.dueDate}</p>
              <p>Due Mileage: {job.dueMileage}</p>
              {motorcycleUserHref === href && (
                <>
                  <button onClick={() => onEdit(job.href)}>Edit</button>
                  <button onClick={() => onDelete(job.href)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {motorcycleUserHref === href && (
        <>
          <div className="schedule-form">
            <h2>{isUpdating ? "Update Job" : "Add Job"}</h2>
            <form onSubmit={isUpdating ? handleUpdateJob : handleCreateJob}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={job.title}
                  onChange={handleJobInputChange}
                  required
                />
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={job.description}
                  onChange={handleJobInputChange}
                  required
                />
              </div>
              <div>
                Cost
                <input
                  type="number"
                  name="cost"
                  placeholder="Cost"
                  value={job.cost}
                  onChange={handleJobInputChange}
                  required
                />
              </div>
              <div>
                Due Date
                <input
                  type="date"
                  name="dueDate"
                  value={job.dueDate}
                  onChange={handleJobInputChange}
                />
              </div>
              <div>
                Due Mileage
                <input
                  type="number"
                  name="dueMileage"
                  placeholder="Due Mileage"
                  value={job.dueMileage}
                  onChange={handleJobInputChange}
                />
              </div>
              <button type="submit">
                {isUpdating ? "Save Changes" : "Create Job"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Schedule;
