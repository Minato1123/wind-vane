import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../../utils/index'

export default defineEventHandler(async (event) => {
  const { postId } = event.context.params!
  const theToken = event.node.req.headers['access-token'] as string
  const userId = await getUserId(theToken)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }

  const responsedIndex = db.data.responses.findIndex(p => p.postId === postId && p.userId === userId)

  if (responsedIndex === -1) {
    return createErrorResponse({
      message: 'Bad Request',
    })
  }

  db.data.responses.splice(responsedIndex, 1)

  return createSuccessResponse(null)
})
