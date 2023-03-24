import { db } from '../plugins/dataController'
import { createSuccessResponse } from '../utils/index'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const tagIds = db.data.tags_posts_association.filter(t => t.postId === query.postId).map(m => m.tagId)
  const tagList = db.data.tags.filter(t => tagIds.includes(t.id))

  return createSuccessResponse(tagList)
})
