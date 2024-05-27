import { Request, Response } from 'express';
import noteRepository from '../repositories/noteRepository';

export const getNotes = async (req: Request, res: Response) => {
  const notes = await noteRepository.getAllNotes();
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const note = await noteRepository.createNote(title, content);
  res.json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await noteRepository.updateNote(id, title, content);
  res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  await noteRepository.deleteNote(id);
  res.sendStatus(204);
};
