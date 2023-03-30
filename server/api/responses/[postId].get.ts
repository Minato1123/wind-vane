import { createErrorResponse, createSuccessResponse, getData } from '../../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }
  const { postId } = event.context.params!
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userId = event.context.auth.userId as number

  const post = db.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  const theResponseObj = db.responses.find(r => r.postId === post.id && r.userId === userId)
  const response = theResponseObj == null ? null : theResponseObj.response

  return createSuccessResponse({ response })
})
