export const login = async (user) => {
  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const json = await res.json();

  return { ok: res.ok, json };
};
