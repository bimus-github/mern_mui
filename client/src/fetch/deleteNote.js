export const deleteNote = async (_id) => {
  const response = await fetch(`/api/notes/${_id}`, {
    method: "DELETE",
  });
  const json = await response.json();

  console.log(json, response);

  return { ok: response.ok, json };
};
