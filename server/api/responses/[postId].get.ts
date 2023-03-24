import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../../utils/index'

export default defineEventHandler((event) => {
  const { postId } = event.context.params!
  const userId = getUserId()
  const post = db.data.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  const response = db.data.responses.find(r => r.postId === post.id && r.userId === userId)?.response ?? null

  return createSuccessResponse({ response })
})
