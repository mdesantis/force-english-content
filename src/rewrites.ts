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
  return array.splice(index, 0, element) // eslint-disable-line @typescript-eslint/no-magic-numbers
}

function replaceAt(array: unknown[], index: number, element: unknown) {
  return array.splice(index, 1, element) // eslint-disable-line @typescript-eslint/no-magic-numbers
}

function removeAt(array: unknown[], index: number) {
  return array.splice(index, 1) // eslint-disable-line @typescript-eslint/no-magic-numbers
}

function rewriteMicrosoftDocsUrl(url: URL) {
  if (url.hostname !== 'docs.microsoft.com') return null

  const englishLocale = 'en-us'
  const pathnameFragments = url.pathname.split('/')
  const [, localeFragment] = pathnameFragments

  if (localeFragment && caseInsensitiveStringEqual(localeFragment, englishLocale)) return null

  if (localeFragment?.match(/^[a-z]{2}-[a-z]{2}$/ui)) {
    replaceAt(pathnameFragments, 1, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
  } else {
    insertAt(pathnameFragments, 1, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
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
    replaceAt(pathnameFragments, 1, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
  } else {
    insertAt(pathnameFragments, 1, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
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
    replaceAt(pathnameFragments, 1, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
  } else {
    insertAt(pathnameFragments, 1, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
  }

  url.pathname = pathnameFragments.join('/')

  return url
}

function rewriteLegacyReactJsUrl(url: URL) {
  if (!(/^[a-z]{2}(?:-[a-z]{2,4})?\.legacy\.reactjs\.org$/u).exec(url.hostname)) return null

  const hostnameFragments = url.hostname.split('.')

  const [localeFragment] = hostnameFragments

  const englishLocale = 'en'

  if (localeFragment && caseInsensitiveStringEqual(localeFragment, englishLocale)) return null

  replaceAt(hostnameFragments, 0, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers

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
  if (secondFragment && caseInsensitiveStringEqual(secondFragment, 'help-translate.php')) return null

  const englishLocale = 'en'

  if (secondFragment && caseInsensitiveStringEqual(secondFragment, englishLocale)) return null

  if (secondFragment?.match(/^[a-z]{2}(?:_[a-z]{2})?$/ui)) {
    replaceAt(pathnameFragments, 2, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
  } else {
    insertAt(pathnameFragments, 2, englishLocale) // eslint-disable-line @typescript-eslint/no-magic-numbers
  }

  url.pathname = pathnameFragments.join('/')

  return url
}

function rewritePythonDocsUrl(url: URL) {
  if (url.hostname !== 'docs.python.org') return null

  const pathnameFragments = url.pathname.split('/')
  const [, localeFragment] = pathnameFragments

  if (!localeFragment?.match(/^[a-z]{2}(?:-[a-z]{2})?$/ui)) return null

  removeAt(pathnameFragments, 1) // eslint-disable-line @typescript-eslint/no-magic-numbers

  url.pathname = pathnameFragments.join('/')

  return url
}

const REWRITES = {
  '*://*.legacy.reactjs.org/*': rewriteLegacyReactJsUrl,
  '*://developer.mozilla.org/*': rewriteMozillaMdnUrl,
  '*://developers.facebook.com/*': rewriteFacebookDevelopersUrl,
  '*://docs.microsoft.com/*': rewriteMicrosoftDocsUrl,
  '*://docs.python.org/*': rewritePythonDocsUrl,
  '*://learn.microsoft.com/*': rewriteMicrosoftLearnUrl,
  '*://www.php.net/*': rewritePhpManualUrl
}

export default REWRITES
