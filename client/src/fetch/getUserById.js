export const getUserById = async (id) => {
  const response = await fetch(`/api/user/${id}`);
  const data = await response.json();
  return { ok: response.ok, data };
};
