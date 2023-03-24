import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../../utils/index'

export default defineEventHandler((event) => {
  const { postId } = event.context.params!
  const post = db.data.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  const numOfPositive = db.data.responses.filter(r => r.postId === post.id && r.response === 'positive').length
  const numOfNegative = db.data.responses.filter(r => r.postId === post.id && r.response === 'negative').length

  return createSuccessResponse({
    ...post,
    numOfPositive,
    numOfNegative,
  })
})
