import Note from '../models/Note';

const getAllNotes = async () => {
  return await Note.find();
};

const createNote = async (title: string, content: string) => {
  const note = new Note({
    title,
    content,
  });
  await note.save();
  return note;
};

const updateNote = async (id: string, title: string, content: string) => {
  return await Note.findByIdAndUpdate(id, { title, content }, { new: true });
};

const deleteNote = async (id: string) => {
  return await Note.findByIdAndDelete(id);
};

export default {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
