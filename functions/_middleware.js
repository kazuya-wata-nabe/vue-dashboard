async function errorHandling(context) {
  try {
    return await context.next()
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}

async function handleRequest({ next, request }) {
  // The "Authorization" header is sent when authenticated.
  if (request.headers.has("Authorization")) {
    const Authorization = request.headers.get('Authorization')
    // Throws exception when authorization fails.

    const [scheme, encoded] = Authorization.split(' ')

    // The Authorization header must start with Basic, followed by a space.
    if (!encoded || scheme !== 'Basic') {
      return new Response(`The Authorization header must start with Basic`, {
        status: 400,
      })
    }

    const buffer = Uint8Array.from(atob(encoded), (character) =>
      character.charCodeAt(0)
    )
    const decoded = new TextDecoder().decode(buffer).normalize()

    const index = decoded.indexOf(':')

    // The user & password are split by the first colon and MUST NOT contain control characters.
    // @see https://tools.ietf.org/html/rfc5234#appendix-B.1 (=> "CTL = %x00-1F / %x7F")
    if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
      return new Response('Invalid authorization value.', { status: 400 })
    }

    const user = decoded.substring(0, index);
    const pass = decoded.substring(index + 1);

    if (env.BASIC_AUTH_USER !== user) {
      return new Response('Invalid credentials.', { status: 401 })
    }

    if (env.BASIC_AUTH_PASSWORD !== pass) {
      return new Response('Invalid credentials.', { status: 401 })
    }

    return await next()
  }

  return new Response('You need to login.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
    },
  })
}

export const onRequest = [errorHandling, handleRequest]