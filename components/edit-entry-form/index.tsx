import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import useEntry from "@/hooks/useEntry";

import Button from '../button'
import EditorJS from '@editorjs/editorjs'
import Checklist from '@editorjs/checklist'
import Paragraph from '@editorjs/paragraph'

export default function EntryForm() {
  const [_title, setTitle] = useState('')
  const [_content, setContent] = useState({})
  const [_description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const [ result, loading, hasError ] = useEntry(id)
  const { title, description, content } = result

  useEffect( () => {

  }, [ loading, hasError ])

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/edit-entry', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: _title,
          description: _description,
          content: _content,
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  useEffect(() => {
    console.log('result', result);

    if (typeof title === 'string') {
      setTitle(title)
    }
    if (typeof description === 'string') {
      setDescription(description)
    }
    if (typeof content === 'string') {
      setContent(content)
    }
  }, [result, title, description, content])

  if (loading) {
    return 'грузим запись'
  }

  if (hasError) {
    return 'ошибка'
  }

  if (!title || !description || !content) {
    console.log('title, description, content', title, description, content)
    return 'нет чот ничо пока что'
  }

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
    },

    data: content
  })

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4">
        <label htmlFor="title">
          <h3 className="font-bold">Title</h3>
        </label>
        <input
          id="title"
          className="shadow border rounded w-full"
          type="text"
          name="title"
          value={_title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="content">
          <h3 className="font-bold">Content</h3>
        </label>
        <textarea
          className="shadow border resize-none focus:shadow-outline w-full h-48"
          id="description"
          name="description"
          value={_description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div id="editorjs"/>
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Saving ...' : 'Save'}
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
