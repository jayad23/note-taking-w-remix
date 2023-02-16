import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import Newnotes, { NewnoteStyles } from "~/components/new-note/Newnotes";
import NotesList, { NotesListStyles } from "~/components/notes-list/NotesLists";
import { createNote, getStoredNotes } from "~/db/notes";
import { validator } from "utilities/Tools";
import { Fragment } from "react";
export const links = () => ([NewnoteStyles, NotesListStyles]);

export const action = async ({ request }) => {
  const formValues = await request.formData();
  // const noteData = {
  //   title: formValues.get("title"),
  //   content: formValues.get("content")
  // };
  const noteData = Object.fromEntries(formValues);
  if (validator(noteData.title, 4) || validator(noteData.content, 10)) {
    const errorMessage = {
      message: "Please, check the length of the new task you're trying to create is enough."
    };
    return errorMessage;
  };

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await createNote(updatedNotes);
  return redirect("/notes");
};

export const loader = async () => {
  const notes = await getStoredNotes();
  //OPTION 1
  // return new Response(JSON.stringify(notes), {
  //   headers: { 'Content-Type': 'application/json' }
  // })
  //OPTION 2
  //return json(notes);
  //OPTION 3
  if (!notes || notes.length === 0) {
    throw json({
      message: "Notes not found"
    }, {
      status: 404,
      statusText: "Not found"
    })
  }
  return notes;
};
export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <Newnotes />
      <NotesList notes={notes} />
    </main>
  );
};

export const CatchBoundary = () => {
  const error = useCatch();
  return <ErrorBoundary error={error?.data || { message: "There has been an error" }} />;
}

export const ErrorBoundary = ({ error }) => {
  return (
    <Fragment>
      <Newnotes />
      <main className="error">
        <p>Oh no!</p>
        <p>{error.message}</p>
        <p>Back to <Link to="/">safety</Link></p>
      </main>
    </Fragment>
  )
}