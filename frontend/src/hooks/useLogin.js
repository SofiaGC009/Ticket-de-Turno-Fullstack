import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import config from "../config/config";

const useLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const { login } = useAuth();

  const handleLogin = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Campo de usuario vacío",
        text: "Por favor ingrese un usuario",
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Campo de contraseña vacío",
        text: "Por favor ingrese una contraseña",
      });
      return;
    }

    const admin = config.admins.find(
      (admin) => admin.user === user && admin.password === password
    );

    if (!admin) {
      Swal.fire({
        icon: "error",
        title: "Usuario o contraseña incorrectos",
        text: "Por favor verifique sus credenciales",
      });
      return;
    }

    if (!captchaValue) {
      Swal.fire({
        icon: "error",
        title: "Captcha no completada",
        text: "Por favor complete el captcha",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      login();
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return {
    user,
    setUser,
    password,
    setPassword,
    handleLogin,
    handleCaptchaChange,
  };
};

export default useLogin;
