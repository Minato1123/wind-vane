import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../utils/index'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const body = await readBody<{
    postId: string
  }>(event)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number

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
