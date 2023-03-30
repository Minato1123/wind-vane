import { createErrorResponse, createSuccessResponse, getData, setData } from '../utils/index'

export default defineEventHandler(async (event) => {
  const db = await getData()
  const body = await readBody<{
    email: string | null
    password: string
  }>(event)

  const user = db.users.find(u => u.email === body.email && u.password === body.password && u.deleted === false)
  if (user == null) {
    return createErrorResponse({
      message: 'Not found',
    })
  }

  const tokenMap = db.token_map

  tokenMap.reduce((acc: number[], tokenObj, i) => {
    if (tokenObj.userId === user.id)
      acc.push(i)
    return acc
  }, [])

  const theToken = `${Date.now()}`
  tokenMap.push({
    token: theToken,
    userId: user.id,
  })
  await setData(db)

  return createSuccessResponse({ token: theToken, userId: user.id })
})
