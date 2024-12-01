import { useEffect, useState } from "react";
import { getMotorcycleById } from "../../api";
import { useParams } from "react-router-dom";
import { toNumber } from "../../utils/Number";
import { toString } from "../../utils/String";
import "../Comments/Comment.css";

const MotorcycleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<any>(null);
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

  if (error) return <p>{error}</p>;
  if (!motorcycle) return <p>Loading...</p>;

  return (
    <div>
      <h1>{motorcycle.name}</h1>
      <p>{motorcycle.make}</p>
      <p>{motorcycle.model}</p>
      <p>{motorcycle.year}</p>
      <p>{motorcycle.mileage}</p>
      <p>{motorcycle.owner}</p>

      <div>
        <h2>Specifications</h2>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(motorcycle.specs).map(([key, value]) => (
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
        <h2>Comments</h2>
        <ul className="comments-container">
          {motorcycle.comments.map((comment: any) => (
            <li key={comment.id} className="comment-item">
              <h3 className="comment-title">{comment.title}</h3>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-footer">
                by {comment.createdBy} on {comment.createdOn}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MotorcycleDetails;
