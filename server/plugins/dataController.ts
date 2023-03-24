import initialData from '../db.json'

interface StoredData {
  users: {
    id: number
    email: string
    password: string
    createdTime: string
    deleted: boolean
  }[]
  posts: {
    id: string
    userId: number
    content: string | null
    question: string
    createdTime: string
    deleted: boolean
  }[]
  saved_posts: {
    userId: number
    postId: string
  }[]
  responses: {
    postId: string
    userId: number
    response: 'positive' | 'negative'
  }[]
  tags: {
    id: number
    name: string
  }[]
  tags_posts_association: {
    tagId: number
    postId: string
  }[]
}

export const db: {
  data: StoredData
} = {
  data: initialData as StoredData,
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function init() {
  try {
    const data = await useStorage('db').getItem('data') as StoredData | null
    if (data != null)
      db.data = data
  }
  catch (e) {
    console.error(e)
  }

  while (true) {
    await delay(3000)
    await useStorage('db').setItem('data', JSON.stringify(db.data, null, 2))
  }
}

export default defineNitroPlugin(() => {
  init().catch(() => {})
})
