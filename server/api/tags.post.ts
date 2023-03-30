import { createErrorResponse, createSuccessResponse, getData, setData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const body = await readBody<{
    tags: string[]
  }>(event)

  const lastTag = db.tags[db.tags.length - 1]
  let newTagId = lastTag == null ? 0 : lastTag.id
  const tagIdList: number[] = []

  body.tags.forEach((tag) => {
    const existedTag = db.tags.find(t => t.name === tag)
    if (existedTag != null) {
      tagIdList.push(existedTag.id)
      return
    }

    tagIdList.push(++newTagId)
    db.tags.push({
      id: newTagId,
      name: tag,
    })
  })

  await setData(db)

  return createSuccessResponse({
    tagIdList,
  })
})
