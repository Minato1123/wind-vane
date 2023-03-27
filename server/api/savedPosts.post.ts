import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../utils/index'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    postId: string
  }>(event)
  const theToken = event.node.req.headers['access-token'] as string
  const userId = getUserId(theToken)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }

  const post = db.data.posts.find(p => p.id === body.postId && p.deleted === false)
  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  db.data.saved_posts.push({
    userId,
    postId: body.postId,
  })

  return createSuccessResponse(null)
})
