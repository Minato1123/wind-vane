export interface StoredData {
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
  token_map: {
    token: string
    userId: number
  }[]
}

export async function getData() {
  const db = await useStorage('db').getItem('data')
  if (db != null)
    return db as StoredData

  return {
    users: [],
    posts: [],
    saved_posts: [],
    responses: [],
    tags: [],
    tags_posts_association: [],
    token_map: [],
  } as StoredData
}

export async function setData(data: StoredData) {
  await useStorage('db').setItem('data', JSON.stringify(data, null, 2))
}

export function createSuccessResponse<T>(data: T) {
  return {
    data,
    error: null,
    success: true,
  }
}

export function createErrorResponse(error: {
  message: string
}) {
  return {
    data: null,
    error,
    success: false,
  }
}

export function generatePostId() {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
}
