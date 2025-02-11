import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";

interface Props {}

const Login: React.FC<Props> = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ userName, password });

      const { href: userHref, accessToken, refreshToken } = response.data;
      localStorage.setItem("userHref", userHref);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      login(userHref, accessToken, refreshToken);

      navigate("/stable");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="tws-form-container">
      <h2 className="tws-form-title">Login</h2>

      {error && <p className="tws-error-message">{error}</p>}

      <form className="tws-form" onSubmit={handleSubmit}>
        <div className="tws-form-group">
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="tws-button-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
