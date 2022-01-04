function replaceAt(array, index, element) {
  array.splice(index, 1, element)
}

function insertAt(array, index, element) {
  array.splice(index, 0, element)
}

function rewriteMicrosoftDocsUrl(url) {
  if (!url.hostname.match(/^docs\.microsoft\.com$/ui)) return null

  const fragments = url.pathname.split('/')
  const [, localeCandidate] = fragments

  if (localeCandidate.match(/^en-us$/ui)) return null

  if (localeCandidate.match(/^[a-z]{2}-[a-z]{2}$/ui)) {
    replaceAt(fragments, 1, 'en-us')
  } else {
    insertAt(fragments, 1, 'en-us')
  }

  url.pathname = fragments.join('/')

  return url
}

function rewriteMozillaMdnUrl(url) {
  if (!url.hostname.match(/^developer\.mozilla\.org$/ui)) return null

  const fragments = url.pathname.split('/')

  if (!fragments[2] || !fragments[2].match(/^docs$/ui)) return null

  const [, localeCandidate] = fragments

  if (localeCandidate.match(/^en-US$/ui)) return null

  if (localeCandidate.match(/^[a-z]{2}(?:-[a-z]{2})?$/ui)) {
    replaceAt(fragments, 1, 'en-US')
  } else {
    insertAt(fragments, 1, 'en-US')
  }

  url.pathname = fragments.join('/')

  return url
}

function rewriteReactJsUrl(url) {
  if (!url.hostname.match(/^[a-z]{2}\.reactjs\.org$/ui)) return null

  const fragments = url.hostname.split('.')

  if (fragments.length !== 3) return null

  const [localeCandidate] = fragments

  if (localeCandidate.match(/^en$/ui)) return null

  replaceAt(fragments, 0, 'en')

  url.hostname = fragments.join('.')

  return url
}

function rewriteFacebookDevelopersUrl(url) {
  if (!url.hostname.match(/^developers\.facebook\.com$/ui)) return null

  const locale = url.searchParams.get('locale')

  if (locale && locale.match(/^en_US$/ui)) return null

  url.searchParams.set('locale', 'en_US')

  return url
}

function handleBeforeRequest({ 'url': urlAsString }) {
  const url = new URL(urlAsString)

  const rewrittenUrlFns = [
    rewriteMicrosoftDocsUrl,
    rewriteMozillaMdnUrl,
    rewriteReactJsUrl,
    rewriteFacebookDevelopersUrl
  ]

  for (const rewrittenUrlFn of rewrittenUrlFns) {
    const redirectUrl = rewrittenUrlFn(url)

    if (redirectUrl) return { 'redirectUrl': redirectUrl.toString() }
  }

  return null
}

function start() {
  const urls = [
    '*://docs.microsoft.com/*',
    '*://developer.mozilla.org/*',
    '*://*.reactjs.org/*',
    '*://developers.facebook.com/*'
  ]
  const listener = handleBeforeRequest
  const filter = { 'types': ['main_frame'], urls }
  const extraInfoSpec = ['blocking']

  browser.webRequest.onBeforeRequest.addListener(listener, filter, extraInfoSpec)
}

start()
