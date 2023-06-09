import { createErrorResponse, createSuccessResponse, generatePostId, getData, setData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const body = await readBody<{
    content: string | null
    question: string
  }>(event)

  if (body.question.trim() === '') {
    return createErrorResponse({
      message: 'Bad request',
    })
  }

  let newPostId = generatePostId()
  while (true) {
    if (db.posts.map(p => p.id).includes(newPostId) === false)
      break
    newPostId = generatePostId()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number

  const createdTime = `${Date.now()}`

  db.posts.push({
    id: newPostId,
    userId,
    content: body.content,
    question: body.question,
    createdTime,
    deleted: false,
  })
  await setData(db)

  return createSuccessResponse({ postId: newPostId })
})
