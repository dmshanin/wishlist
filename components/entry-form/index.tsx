import { useState } from 'react'
import Router from 'next/router'

import Button from '@/components/button'
import EditorJS from '@editorjs/editorjs'
import Checklist from '@editorjs/checklist'
import Paragraph from '@editorjs/paragraph'

export default function EntryForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: 'editorjs',

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
      // header: {
      //   class: Header,
      //   inlineToolbar : true
      // },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },

      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
    }
  })

  async function saveEditorData() {
    let outputData;

    try {
      outputData = await editor.save()
    } catch (e) {
      throw Error(e.message)
    }

    console.log('outputData', outputData)

    return outputData;
  }

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const editorData = await saveEditorData()
        console.log('editorData', editorData)
        console.log('editorData.blocks', editorData.blocks)
      const content = JSON.stringify(editorData.blocks)
      const res = await fetch('/api/create-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4">
        <label htmlFor="title">
          <h3 className="font-bold">List title</h3>
        </label>
        <input
          id="title"
          className="shadow border rounded w-full"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="description">
          <h3 className="font-bold">Description</h3>
        </label>

        <textarea
            className="shadow border resize-none focus:shadow-outline w-full h-48"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />

        <div id="editorjs"/>
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Creating ...' : 'Create'}
      </Button>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </form>
  )
}
