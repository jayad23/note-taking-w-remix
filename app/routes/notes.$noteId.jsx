import { Form, Link, useLoaderData } from '@remix-run/react';
import React, { useState } from 'react'
import { getStoredNotes } from '~/db/notes';
import styles from "../styles/notesdetails.css";

export const links = () => ([
  { rel: "stylesheet", href: styles }
])

export const loader = async ({ params }) => {
  const notes = await getStoredNotes();
  const selected = notes.find(note => note.title === params.noteId);
  return selected;
}

const NoteDetail = () => {
  const note = useLoaderData();
  const [toedit, setToEdit] = useState(false);
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
          <button className={`${toedit ? 'edit-info-cancel' : 'edit-info'}`} onClick={() => setToEdit(!toedit)}>{toedit ? "Cancel" : "Edit info"}</button>
        </nav>
      </header>
      {
        toedit ? (
          <Form>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "left" }}>
              <p style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor='title'>Title</label>
                <input
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    outline: "none",
                  }}
                  type="text"
                  id="title"
                  name="title"
                  value={note.title}
                />
              </p>
              <p style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor='content'>Content</label>
                <textarea
                  style={{
                    borderRadius: "5px",
                    outline: "none"
                  }}
                  id="content"
                  name="content"
                  rows="5"
                  value={note.content}
                  required
                />
              </p>
              <div className='form-actions'>
                <button disabled className='edit-info'>Save changes</button>
              </div>
            </div>
          </Form>
        ) : (
          <section>
            <h1>{note.title}</h1>
            <p id="note-details-content">{note.content}</p>
          </section>
        )
      }
    </main>
  )
}

export default NoteDetail;