import { createErrorResponse, createSuccessResponse, getData, setData } from '../../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((event.context.auth.userId) == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const { postId } = event.context.params!

  const post = db.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  post.deleted = true
  await setData(db)
  return createSuccessResponse(null)
})
