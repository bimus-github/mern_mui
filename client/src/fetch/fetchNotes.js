export const fetchNotes = async () => {
  const response = await fetch("/api/notes");
  const json = await response.json();

  return { ok: response.ok, json };
};
