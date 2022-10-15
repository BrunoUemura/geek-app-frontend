import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/auth";

export function useValidateAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("auth_token") || "";
      if (!token) navigate("/signin", { replace: true });

      const res = await auth.validateToken(token);
      if (res.data.isTokenValid === true) return;

      setTimeout(() => {
        navigate("/signin", { replace: true });
      }, 1000);
    })();
  }, []);
}
