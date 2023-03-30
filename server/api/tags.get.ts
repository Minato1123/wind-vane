import { createSuccessResponse, getData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  const query = getQuery(event)
  const tagIds = db.tags_posts_association.filter(t => t.postId === query.postId).map(m => m.tagId)
  const tagList = db.tags.filter(t => tagIds.includes(t.id))

  return createSuccessResponse(tagList)
})
