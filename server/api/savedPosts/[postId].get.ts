import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../../utils/index'

export default defineEventHandler((event) => {
  const { postId } = event.context.params!
  const theToken = event.node.req.headers['access-token'] as string
  const userId = getUserId(theToken)

  if (userId == null) {
    return createErrorResponse({
      message: 'Bad request',
    })
  }
  const post = db.data.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  const savedPostData = db.data.saved_posts.find(r => r.postId === post.id && r.userId === userId)
  const isSavedPost = savedPostData != null

  return createSuccessResponse({ isSavedPost })
})
