export const signup = async (user) => {
  const res = await fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const json = await res.json();

  return { ok: res.ok, json };
};
