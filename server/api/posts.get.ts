import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../utils/index'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const postIdList: string[] = []

  if (query.type === 'savedPost') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((event.context.auth.userId) == null) {
      return createErrorResponse({
        message: 'Unauthorized',
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = event.context.auth.userId as number
    postIdList.push(...db.data.saved_posts.filter(u => u.userId === +userId).map(p => p.postId))
  }
  else if (query.type === 'responsedPost') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((event.context.auth.userId) == null) {
      return createErrorResponse({
        message: 'Unauthorized',
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = event.context.auth.userId as number
    postIdList.push(...db.data.responses.filter(u => u.userId === +userId).map(p => p.postId))
  }
  else if (query.type === 'tagsPost') {
    const tags = query.tags?.toString()
    const tagList = tags?.split(',').map(m => db.data.tags.find(t => t.name === m)?.id)

    postIdList.push(...db.data.tags_posts_association.filter(t => tagList?.includes(t.tagId)).map(p => p.postId))
  }
  else {
    postIdList.push(...db.data.posts.map(p => p.id))
  }

  const posts = db.data.posts.filter(p => postIdList.includes(p.id) && p.deleted === false).reverse()

  return createSuccessResponse(posts)
})
