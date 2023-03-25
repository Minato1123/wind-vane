import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../utils/index'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    postId: string
    response: 'positive' | 'negative'
  }>(event)

  const theToken = event.node.req.headers['access-token'] as string
  const userId = await getUserId(theToken)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }

  db.data.responses.push({
    userId,
    postId: body.postId,
    response: body.response,
  })

  return createSuccessResponse(null)
})
