import { db } from '../plugins/dataController'
import { createErrorResponse, createSuccessResponse } from '../utils/index'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const body = await readBody<{
    tags: string[]
  }>(event)

  let newTagId = db.data.tags[db.data.tags.length - 1]?.id ?? 0
  const tagIdList: number[] = []

  body.tags.forEach((tag) => {
    const existedTag = db.data.tags.find(t => t.name === tag)
    if (existedTag != null)
      return

    tagIdList.push(++newTagId)
    db.data.tags.push({
      id: newTagId,
      name: tag,
    })
  })

  return createSuccessResponse({
    tagIdList,
  })
})
