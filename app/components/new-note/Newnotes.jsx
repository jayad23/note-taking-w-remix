import { Form, useActionData, useNavigation } from '@remix-run/react';
import React from 'react'
import localStyles from "./styles.css";

export const NewnoteStyles = { rel: "stylesheet", href: localStyles };

const Newnotes = () => {
  const validation = useActionData();
  const navigation = useNavigation();
  const inSubmittion = navigation.state === "submitting";
  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor='title'>Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor='content'>Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className='form-actions'>
        <button disabled={inSubmittion}>Add Note</button>
      </div>
      {validation?.message && (<p className='error-message'>{validation.message}</p>)}
    </Form>
  )
}

export default Newnotes