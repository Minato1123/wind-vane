import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../../utils/index'

export default defineEventHandler((event) => {
  const { postId } = event.context.params!
  const userId = getUserId()

  const responsedIndex = db.data.responses.findIndex(p => p.postId === postId && p.userId === userId)

  if (responsedIndex === -1) {
    return createErrorResponse({
      message: 'Bad Request',
    })
  }

  db.data.responses.splice(responsedIndex, 1)

  return createSuccessResponse(null)
})
