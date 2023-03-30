import { createErrorResponse, createSuccessResponse, getData } from '../../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  const { postId } = event.context.params!
  const post = db.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  const numOfPositive = db.responses.filter(r => r.postId === post.id && r.response === 'positive').length
  const numOfNegative = db.responses.filter(r => r.postId === post.id && r.response === 'negative').length

  return createSuccessResponse({
    ...post,
    numOfPositive,
    numOfNegative,
  })
})
