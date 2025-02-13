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
      <h1>Login</h1>

      {error && <p className="tws-message-error">{error}</p>}

      <form className="tws-form" onSubmit={handleSubmit}>
        <div className="tws-form-group">
          <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="tws-form-group">
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="tws-form-group">
          <button className="tws-button-submit" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
