import { db } from '../../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../../utils/index'

export default defineEventHandler((event) => {
  const { postId } = event.context.params!
  const query = getQuery(event)

  const post = db.data.posts.find(p => p.id === postId && p.deleted === false)

  if (post == null)
    return createErrorResponse({ message: 'Not found' })

  if (query.response === 'positive') {
    const numOfResponse = db.data.responses.filter(r => r.postId === post.id && r.response === 'positive').length
    return createSuccessResponse({ numOfResponse })
  }

  else if (query.response === 'negative') {
    const numOfResponse = db.data.responses.filter(r => r.postId === post.id && r.response === 'negative').length
    return createSuccessResponse({ numOfResponse })
  }
})
