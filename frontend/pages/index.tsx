import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Note {
  _id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const createNote = async () => {
    try {
      const response = await axios.post('/api/notes', newNote);
      setNotes([...notes, response.data]);
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const updateNote = async (id: string, updatedNote: Note) => {
    try {
      await axios.put(`/api/notes/${id}`, updatedNote);
      setNotes(notes.map(note => (note._id === id ? updatedNote : note)));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Container>
      <h1>Notes</h1>
      <div>
        <TextField
          label="Título"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <TextField
          label="Conteúdo"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <Button onClick={createNote} variant="contained" color="primary">
          Add Note
        </Button>
      </div>
      <List>
        {notes.map((note) => (
          <ListItem key={note._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <TextField
              label="Title"
              value={note.title}
              onChange={(e) => updateNote(note._id, { ...note, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Content"
              value={note.content}
              onChange={(e) => updateNote(note._id, { ...note, content: e.target.value })}
              fullWidth
              multiline
            />
            <IconButton onClick={() => deleteNote(note._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
