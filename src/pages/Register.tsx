import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({ userName, email, password });
      setSuccess("Registration successful! Redirecting...");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed!");
      setSuccess("");
    }
  };

  return (
    <div className="tws-form-container">
      <h2>Register</h2>

      {error && <p className="tws-message-error">{error}</p>}
      {success && <p className="tws-message-success">{success}</p>}

      <form className="tws-form" onSubmit={handleSubmit}>
        <div className="tws-form-group">
          <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="tws-form-group">
          <input
            type="email"
            placeholder="user@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="tws-form-group">
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="tws-form-group">
          <button className="tws-button-submit" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
