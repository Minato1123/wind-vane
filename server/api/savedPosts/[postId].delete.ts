import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../../utils/index'

export default defineEventHandler((event) => {
  const { postId } = event.context.params!
  const userId = getUserId()

  const savedPostIndex = db.data.saved_posts.findIndex(p => p.postId === postId && p.userId === userId)

  if (savedPostIndex === -1) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  db.data.saved_posts.splice(savedPostIndex, 1)

  return createSuccessResponse(null)
})