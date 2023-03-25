import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse, getUserId } from '../utils/index'

export default defineEventHandler(async (event) => {
  const theToken = event.node.req.headers['access-token'] as string
  const userId = await getUserId(theToken)

  const query = getQuery(event)

  const postIdList: string[] = []

  if (query.type === 'savedPost') {
    if (userId == null) {
      return createErrorResponse({
        message: 'Bad request',
      })
    }
    postIdList.push(...db.data.saved_posts.filter(u => u.userId === +userId).map(p => p.postId))
  }
  else if (query.type === 'responsedPost') {
    if (userId == null) {
      return createErrorResponse({
        message: 'Bad request',
      })
    }
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

  const posts = db.data.posts.filter(p => postIdList.includes(p.id) && p.deleted === false)
  const postList = posts.map((p) => {
    const numOfPositive = db.data.responses.filter(r => r.postId === p.id && r.response === 'positive').length
    const numOfNegative = db.data.responses.filter(r => r.postId === p.id && r.response === 'negative').length
    return {
      ...p,
      numOfPositive,
      numOfNegative,
    }
  })
  return createSuccessResponse(postList)
})
