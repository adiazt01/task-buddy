import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Note } from "../types";

export interface NoteState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  createNote: (note: Note) => void;
  updateNote: (noteId: string, updatedNote: Note) => void;
  deleteNote: (noteId: string) => void;
}

const useNoteStore = create<NoteState>()(
  devtools(
    persist(
      (set) => ({
        notes: [],
        setNotes: (notes) => set({ notes }),
        createNote: (note) => {
          set((state) => ({ notes: [...state.notes, note] }));
        },
        updateNote: (noteId, updatedNote) =>
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === noteId ? updatedNote : note
            ),
          })),
        deleteNote: (noteId) =>
          set((state) => ({
            notes: state.notes.filter((note) => note.id !== noteId),
          })),
      }),
      { name: "note-storage" }
    )
  )
);

export default useNoteStore;
