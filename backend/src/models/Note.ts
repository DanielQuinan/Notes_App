import { Schema, model } from 'mongoose';

interface INote {
  title: string;
  content: string;
}

const NoteSchema = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Note = model<INote>('Note', NoteSchema);

export default Note;
