import React from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import useLogin from "../hooks/useLogin";
import config from "../config/config";

const Login = () => {
  const {
    user,
    setUser,
    password,
    setPassword,
    handleLogin,
    handleCaptchaChange,
  } = useLogin();

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  const regresarInicio = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card text-center mt-5">
            <div className="card-header">
              <h1>Login</h1>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                  <span className="input-group-text">Username:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Password:</span>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
                <div className="d-flex justify-content-center mb-3">
                  <ReCAPTCHA
                    sitekey={config.siteKey}
                    onChange={handleCaptchaChange}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary me-2">
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={regresarInicio}
                  >
                    Regresar al Inicio
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
