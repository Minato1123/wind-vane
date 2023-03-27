import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../../utils/index'

export default defineEventHandler(async (event) => {
  const { postId } = event.context.params!
  const theToken = event.node.req.headers['access-token'] as string
  const userId = getUserId(theToken)
  const body = await readBody<{
    response: 'positive' | 'negative'
  }>(event)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }

  const responsedPost = db.data.responses.find(p => p.postId === postId && p.userId === userId)

  if (responsedPost == null) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  responsedPost.response = body.response

  return createSuccessResponse(null)
})
