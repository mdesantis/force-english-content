function replaceAt(array, index, element) {
  array.splice(index, 1, element)
}

function insertAt(array, index, element) {
  array.splice(index, 0, element)
}

function rewriteMicrosoftDocsUrl(url) {
  if (!url.hostname.match(/^docs\.microsoft\.com$/i)) return

  const fragments = url.pathname.split('/')
  const localeCandidate = fragments[1]

  if (localeCandidate.match(/^en-us$/i)) return

  if (localeCandidate.match(/^[a-z]{2}-[a-z]{2}$/i)) {
    replaceAt(fragments, 1, 'en-us')
  } else {
    insertAt(fragments, 1, 'en-us')
  }

  url.pathname = fragments.join('/')

  return url
}

function rewriteMozillaMdnUrl(url) {
  if (!url.hostname.match(/^developer\.mozilla\.org$/i)) return

  const fragments = url.pathname.split('/')

  if (!fragments[2] || !fragments[2].match(/^docs$/i)) return

  const localeCandidate = fragments[1]

  if (localeCandidate.match(/^en-US$/i)) return

  if (localeCandidate.match(/^[a-z]{2}(?:-[a-z]{2})?$/i)) {
    replaceAt(fragments, 1, 'en-US')
  } else {
   insertAt(fragments, 1, 'en-US')
  }

  url.pathname = fragments.join('/')

  return url
}

function rewriteReactJsUrl(url) {
  if (!url.hostname.match(/^[a-z]{2}\.reactjs\.org$/i)) return

  const fragments = url.hostname.split('.')

  if (fragments.length !== 3) return

  const localeCandidate = fragments[0]

  if (localeCandidate.match(/^en$/i)) return

  replaceAt(fragments, 0, 'en')

  url.hostname = fragments.join('.')

  return url
}

function rewriteFacebookDevelopersUrl(url) {
  console.debug(url.hostname.match(/^developers\.facebook\.com$/i))
  if (!url.hostname.match(/^developers\.facebook\.com$/i)) return

  const locale = url.searchParams.get('locale');

  if (locale && locale.match(/^en_US$/i)) return

  url.searchParams.set('locale', 'en_US')

  return url
}

function handleBeforeRequest({ url: urlAsString }) {
  const url = new URL(urlAsString)

  const rewrittenUrlFns = [
    rewriteMicrosoftDocsUrl,
    rewriteMozillaMdnUrl,
    rewriteReactJsUrl,
    rewriteFacebookDevelopersUrl
  ]

  for (const rewrittenUrlFn of rewrittenUrlFns) {
    const redirectUrl = rewrittenUrlFn(url)

    if (redirectUrl) return { redirectUrl: redirectUrl.toString() }
  }
}

function start() {
  const urls = [
    "*://docs.microsoft.com/*",
    "*://developer.mozilla.org/*",
    "*://*.reactjs.org/*",
    "*://developers.facebook.com/*",
  ]
  const listener = handleBeforeRequest
  const filter = { urls, types: ["main_frame"] }
  const extraInfoSpec = ['blocking']

  browser.webRequest.onBeforeRequest.addListener(listener, filter, extraInfoSpec)
}

start()
