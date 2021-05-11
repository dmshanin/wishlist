import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { id, title, description, content } = req.body
  try {
    if (!id || !title || !description || !content) {
      return res
        .status(400)
        .json({ message: '`id`,`title`, `description` and `content` are all required' })
    }

    const results = await query(
      `
      UPDATE entries
      SET title = ?, description = ?, content = ?
      WHERE id = ?
      `,
      [filter.clean(title), filter.clean(description), filter.clean(content), id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
