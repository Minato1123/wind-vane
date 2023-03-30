import { createErrorResponse, createSuccessResponse, getData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  const query = getQuery(event)
  const start = +String(query.partNumber)
  const num = +String(query.postPerPart)

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
    postIdList.push(...db.saved_posts.filter(u => u.userId === userId).map(p => p.postId))
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
    postIdList.push(...db.responses.filter(u => u.userId === userId).map(p => p.postId))
  }
  else if (query.type === 'myPost') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((event.context.auth.userId) == null) {
      return createErrorResponse({
        message: 'Unauthorized',
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = event.context.auth.userId as number
    postIdList.push(...db.posts.filter(a => a.userId === userId).map(p => p.id))
  }
  else if (query.type === 'tagsPost') {
    const tags = String(query.tags)
    const tagList = tags?.split(' ').map(m => db.tags.find(t => t.name === m)?.id)

    postIdList.push(...db.tags_posts_association.filter(t => tagList?.includes(t.tagId)).map(p => p.postId))
  }
  else {
    postIdList.push(...db.posts.map(p => p.id))
  }

  const posts = db.posts.filter(p => postIdList.includes(p.id) && p.deleted === false).reverse().slice(start, start + num)

  return createSuccessResponse(posts)
})
