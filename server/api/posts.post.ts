import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse, generatePostId, getUserId } from '../utils/index'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    content: string | null
    question: string
  }>(event)

  let newPostId = generatePostId()
  while (true) {
    if (db.data.posts.map(p => p.id).includes(newPostId) === false)
      break
    newPostId = generatePostId()
  }

  const theToken = event.node.req.headers['access-token'] as string
  const userId = await getUserId(theToken)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }

  const createdTime = `${Date.now()}`

  db.data.posts.push({
    id: newPostId,
    userId,
    content: body.content,
    question: body.question,
    createdTime,
    deleted: false,
  })

  return createSuccessResponse(null)
})
