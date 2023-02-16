import fs from "fs/promises";

export const getStoredNotes = async () => {
  const rawFile = await fs.readFile('notes.json', { encoding: 'utf-8'});
  const data = JSON.parse(rawFile);
  const notes = data.notes ?? [];
  return notes;
};

export const createNote = (notes) => {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
};