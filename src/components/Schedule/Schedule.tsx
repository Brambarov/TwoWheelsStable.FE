import "./Schedule.css";
import { useEffect, useState } from "react";

const Schedule: React.FC<{
  jobs: any[];
  onCreate: (job: any) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  submitEditJob: (id: string, job: any) => void;
  editJob: any;
  setEditJob: any;
}> = ({
  jobs,
  onCreate,
  onEdit,
  onDelete,
  submitEditJob,
  editJob,
  setEditJob,
}) => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    cost: 0,
    dueDate: "",
    dueMileage: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editJob) {
      setJob({
        title: editJob.title,
        description: editJob.description,
        cost: editJob.cost,
        dueDate: editJob.dueDate,
        dueMileage: editJob.dueMileage,
      });
      setIsEditing(true);
    } else {
      setJob({
        title: "",
        description: "",
        cost: 0,
        dueDate: "",
        dueMileage: 0,
      });
      setIsEditing(false);
    }
  }, [editJob]);

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

  const handleEditJob = async (e: React.FormEvent) => {
    e.preventDefault();
    submitEditJob(editJob.id, job);
    setEditJob(null);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-list">
        <h2>Maintenance Schedule</h2>
        <ul>
          {jobs.map((job: any) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Cost: {job.cost}</p>
              <p>Due Date: {job.dueDate}</p>
              <p>Due Mileage: {job.dueMileage}</p>
              <button onClick={() => onEdit(job.id)}>Edit</button>
              <button onClick={() => onDelete(job.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="schedule-form">
        <h2>{isEditing ? "Edit Job" : "Add Job"}</h2>
        <form onSubmit={isEditing ? handleEditJob : handleCreateJob}>
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
            {isEditing ? "Save Changes" : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
