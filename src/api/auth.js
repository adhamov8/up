const API_URL = import.meta.env.VITE_API_URL;

export const register = async (form) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Ошибка регистрации");
  return res.json();
};

export const login = async (form) => {
  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Ошибка входа");
  return res.json();
};
