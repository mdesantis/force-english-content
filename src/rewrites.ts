
// Copied from https://github.com/sindresorhus/escape-string-regexp/blob/v5.0.0/index.js.
// Can't use `import escapeStringRegexp from 'escape-string-regexp'` because otherwise `yarn exec mocha` fails because
// it can't resolve `.ts` files. Don't ask me why.
function escapeStringRegexp(string: string) {
  return string.
    replace(/[|\\{}()[\]^$+*?.]/gu, '\\$&').
    replace(/-/gu, '\\x2d')
}

function caseInsensitiveStringEqual(actual: string, expected: string) {
  const expectedPattern = new RegExp(`^${escapeStringRegexp(expected)}$`, 'ui')

  return actual.match(expectedPattern)
}

function insertAt(array: unknown[], index: number, element: unknown) {
  return array.splice(index, 0, element)
}

function replaceAt(array: unknown[], index: number, element: unknown) {
  return array.splice(index, 1, element)
}

function removeAt(array: unknown[], index: number) {
  return array.splice(index, 1)
}

function rewriteMicrosoftDocsUrl(url: URL) {
  if (url.hostname !== 'docs.microsoft.com') return null

  const englishLocale = 'en-us'
  const pathnameFragments = url.pathname.split('/')
  const [, localeFragment] = pathnameFragments

  if (localeFragment && caseInsensitiveStringEqual(localeFragment, englishLocale)) return null

  if (localeFragment?.match(/^[a-z]{2}-[a-z]{2}$/ui)) {
    replaceAt(pathnameFragments, 1, englishLocale)
  } else {
    insertAt(pathnameFragments, 1, englishLocale)
  }

  url.pathname = pathnameFragments.join('/')

  return url
}

function rewriteMicrosoftLearnUrl(url: URL) {
  if (url.hostname !== 'learn.microsoft.com') return null

  const englishLocale = 'en-us'
  const pathnameFragments = url.pathname.split('/')
  const [, localeFragment] = pathnameFragments

  if (localeFragment && caseInsensitiveStringEqual(localeFragment, englishLocale)) return null

  if (localeFragment?.match(/^[a-z]{2}-[a-z]{2}$/ui)) {
    replaceAt(pathnameFragments, 1, englishLocale)
  } else {
    insertAt(pathnameFragments, 1, englishLocale)
  }

  url.pathname = pathnameFragments.join('/')

  return url
}

function rewriteMozillaMdnUrl(url: URL) {
  if (url.hostname !== 'developer.mozilla.org') return null

  const pathnameFragments = url.pathname.split('/')
  const [, localeFragment, docsFragment] = pathnameFragments

  if (!docsFragment || !caseInsensitiveStringEqual(docsFragment, 'docs')) return null

  const englishLocale = 'en-US'

  if (localeFragment && caseInsensitiveStringEqual(localeFragment, englishLocale)) return null

  if (localeFragment?.match(/^[a-z]{2}(?:-[a-z]{2})?$/ui)) {
    replaceAt(pathnameFragments, 1, englishLocale)
  } else {
    insertAt(pathnameFragments, 1, englishLocale)
  }

  url.pathname = pathnameFragments.join('/')

  return url
}

function rewriteReactJsUrl(url: URL) {
  if (!url.hostname.match(/^[a-z]{2}\.reactjs\.org$/u)) return null

  const hostnameFragments = url.hostname.split('.')

  if (hostnameFragments.length !== 3) return null

  const [localeFragment] = hostnameFragments

  const englishLocale = 'en'

  if (localeFragment && caseInsensitiveStringEqual(localeFragment, englishLocale)) return null

  replaceAt(hostnameFragments, 0, englishLocale)

  url.hostname = hostnameFragments.join('.')

  return url
}

function rewriteFacebookDevelopersUrl(url: URL) {
  if (url.hostname !== 'developers.facebook.com') return null

  const englishLocale = 'en_US'
  const localeSearchParamValue = url.searchParams.get('locale')

  if (localeSearchParamValue && caseInsensitiveStringEqual(localeSearchParamValue, englishLocale)) return null

  url.searchParams.set('locale', englishLocale)

  return url
}

function rewritePhpManualUrl(url: URL) {
  if (url.hostname !== 'www.php.net') return null

  const pathnameFragments = url.pathname.split('/')
  const [, firstFragment, secondFragment] = pathnameFragments

  if (!firstFragment || !caseInsensitiveStringEqual(firstFragment, 'manual')) return null

  if (secondFragment && caseInsensitiveStringEqual(secondFragment, 'change.php')) return null

  const englishLocale = 'en'

  if (secondFragment && caseInsensitiveStringEqual(secondFragment, englishLocale)) return null

  if (secondFragment?.match(/^[a-z]{2}(?:_[a-z]{2})?$/ui)) {
    replaceAt(pathnameFragments, 2, englishLocale)
  } else {
    insertAt(pathnameFragments, 2, englishLocale)
  }

  url.pathname = pathnameFragments.join('/')

  return url
}

function rewritePythonDocsUrl(url: URL) {
  if (url.hostname !== 'docs.python.org') return null

  const pathnameFragments = url.pathname.split('/')
  const [, localeFragment] = pathnameFragments

  if (!localeFragment?.match(/^[a-z]{2}(?:-[a-z]{2})?$/ui)) return null

  removeAt(pathnameFragments, 1)

  url.pathname = pathnameFragments.join('/')

  return url
}

const REWRITES = {
  '*://*.reactjs.org/*': rewriteReactJsUrl,
  '*://developer.mozilla.org/*': rewriteMozillaMdnUrl,
  '*://developers.facebook.com/*': rewriteFacebookDevelopersUrl,
  '*://docs.microsoft.com/*': rewriteMicrosoftDocsUrl,
  '*://docs.python.org/*': rewritePythonDocsUrl,
  '*://learn.microsoft.com/*': rewriteMicrosoftLearnUrl,
  '*://www.php.net/*': rewritePhpManualUrl
}

export default REWRITES
