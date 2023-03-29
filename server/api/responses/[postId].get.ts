import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../../utils/index'

export default defineEventHandler((event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }
  const { postId } = event.context.params!
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number

  const post = db.data.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  const theResponseObj = db.data.responses.find(r => r.postId === post.id && r.userId === userId)
  const response = theResponseObj == null ? null : theResponseObj.response

  return createSuccessResponse({ response })
})
