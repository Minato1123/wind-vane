import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../../utils/index'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const { postId } = event.context.params!
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number
  const body = await readBody<{
    response: 'positive' | 'negative'
  }>(event)

  const responsedPost = db.data.responses.find(p => p.postId === postId && p.userId === userId)

  if (responsedPost == null) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  responsedPost.response = body.response

  return createSuccessResponse(null)
})
