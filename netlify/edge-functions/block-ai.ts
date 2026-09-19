const blockedUserAgents = [
  'meta-externalagent',
  'GPTBot',
  'Amazonbot',
  'ShapBot',
  'Bytespider',
  'PetalBot',
]

export default (request: Request) => {
  const userAgent = request.headers.get('user-agent') ?? ''
  console.log(`[blocked-user-agent ${userAgent}`)
  return new Response('Forbidden', { status: 403 })
}

export const config = {
  path: '/*',
  header: {
    'user-agent': blockedUserAgents.join('|'),
  },
}
