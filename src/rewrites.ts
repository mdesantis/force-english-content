function replaceAt(array: unknown[], index: number, element: unknown) {
  return array.splice(index, 1, element)
}

function insertAt(array: unknown[], index: number, element: unknown) {
  return array.splice(index, 0, element)
}

export function rewriteMicrosoftDocsUrl(url: URL) {
  if (!url.hostname.match(/^docs\.microsoft\.com$/ui)) return null

  const fragments = url.pathname.split('/')
  const [, locale] = fragments

  if (locale?.match(/^en-us$/ui)) return null

  if (locale?.match(/^[a-z]{2}-[a-z]{2}$/ui)) {
    replaceAt(fragments, 1, 'en-us')
  } else {
    insertAt(fragments, 1, 'en-us')
  }

  url.pathname = fragments.join('/')

  return url
}

export function rewriteMozillaMdnUrl(url: URL) {
  if (!url.hostname.match(/^developer\.mozilla\.org$/ui)) return null

  const fragments = url.pathname.split('/')

  const [, locale, docs] = fragments

  if (!docs || !docs.match(/^docs$/ui)) return null

  if (locale?.match(/^en-US$/ui)) return null

  if (locale?.match(/^[a-z]{2}(?:-[a-z]{2})?$/ui)) {
    replaceAt(fragments, 1, 'en-US')
  } else {
    insertAt(fragments, 1, 'en-US')
  }

  url.pathname = fragments.join('/')

  return url
}

export function rewriteReactJsUrl(url: URL) {
  if (!url.hostname.match(/^[a-z]{2}\.reactjs\.org$/ui)) return null

  const fragments = url.hostname.split('.')

  if (fragments.length !== 3) return null

  const [locale] = fragments

  if (locale?.match(/^en$/ui)) return null

  replaceAt(fragments, 0, 'en')

  url.hostname = fragments.join('.')

  return url
}

export function rewriteFacebookDevelopersUrl(url: URL) {
  if (!url.hostname.match(/^developers\.facebook\.com$/ui)) return null

  const locale = url.searchParams.get('locale')

  if (locale?.match(/^en_US$/ui)) return null

  url.searchParams.set('locale', 'en_US')

  return url
}
