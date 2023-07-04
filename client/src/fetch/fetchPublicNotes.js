export const fetchPublicNotes = async () => {
  const response = await fetch("/api/notes/publicNotes");
  const data = await response.json();
  console.log(response, data);
  return { ok: response.ok, data };
};
