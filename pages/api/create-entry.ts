import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { title, description, content } = req.body
  try {
    if (!title || !description || !content) {
      return res
        .status(400)
        .json({ message: '`title`, `description` and `content` are both required' })
    }

    console.log('content', content);
    // console.log('filter.clean(description)', filter.clean(description));

    const results = await query(
      `
      INSERT INTO entries (title, description, content)
      VALUES (?, ?, ?)
      `,
      // [filter.clean(title), filter.clean(description), filter.clean(content)]
      [filter.clean(title), filter.clean(description), content]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
