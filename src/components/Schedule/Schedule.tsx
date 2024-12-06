import { useState } from "react";

const Schedule: React.FC<{
  jobs: any[];
  onCreate: (job: any) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ jobs, onCreate, onEdit, onDelete }) => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    cost: 0,
    dueDate: "",
    dueMileage: 0,
  });

  const handleJobInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJob((job) => ({ ...job, [name]: value }));
  };

  const handleJobCreate = async (e: React.FormEvent) => {
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

  return (
    <div>
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

      <div>
        <h2>Add Job</h2>
        <form onSubmit={handleJobCreate}>
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
    </div>
  );
};

export default Schedule;
