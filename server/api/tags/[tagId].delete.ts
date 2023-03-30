import { createErrorResponse, createSuccessResponse, getData, setData } from '../../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.context.auth.userId == null) {
    return createErrorResponse({
      message: 'Unauthorized',
    })
  }

  const { tagId } = event.context.params!

  const tagIndex = db.tags.findIndex(t => t.id === +tagId)

  if (tagIndex === -1) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  db.tags.splice(tagIndex, 1)
  await setData(db)

  return createSuccessResponse(null)
})
