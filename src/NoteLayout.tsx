import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import type { Note } from "./App"; // Ensure it's imported as a type

type NoteLayoutProps = {
  notes: Note[];
};

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>(); // Ensuring correct type usage
}
