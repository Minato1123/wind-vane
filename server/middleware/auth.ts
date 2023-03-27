import { tokenMap } from '../tokenMap'

export default defineEventHandler((event) => {
  const theToken = event.node.req.headers['access-token'] as string
  const userId = tokenMap.get(theToken)
  const isTokenValid = userId != null

  const url = event.node.req.url
  const method = event.node.req.method
  // eslint-disable-next-line no-console
  console.log(url, method, theToken, userId)
  if (url == null)
    throw new Error('Bad Request')

  if (/(users|savedPosts|logout)/.test(url) && !isTokenValid)
    throw new Error('Bad Request')

  if (/(posts|tags|responses)/.test(url) && method !== 'GET' && !isTokenValid)
    throw new Error('Bad Request')
})
