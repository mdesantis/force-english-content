
import assert from 'assert'

import REWRITES from './rewrites'

function shouldReturnNull(describedFunction: (url: URL) => URL | null, urlAsString: string) {
  const url = new URL(urlAsString)

  assert.equal(describedFunction(url), null)
}

function shouldNotChangeUrl(describedFunction: (url: URL) => URL | null, urlAsString: string) {
  const url = new URL(urlAsString)

  const urlBeforeFunctionCallAsString = url.toString()

  describedFunction(url)

  const urlAfterFunctionCallAsString = url.toString()

  assert.strictEqual(urlBeforeFunctionCallAsString, urlAfterFunctionCallAsString)
}

function shouldChangeUrl(
  describedFunction: (url: URL) => URL | null,
  urlAsString: string,
  expectedUrlAsString: string
) {
  const url = new URL(urlAsString)

  const urlBeforeFunctionCallAsString = url.toString()

  describedFunction(url)

  const urlAfterFunctionCallAsString = url.toString()

  assert.notStrictEqual(urlBeforeFunctionCallAsString, urlAfterFunctionCallAsString)

  assert.strictEqual(urlAfterFunctionCallAsString, expectedUrlAsString)
}

function shouldReturnChangedUrl(
  describedFunction: (url: URL) => URL | null,
  urlAsString: string,
  expectedUrlAsString: string
) {
  const url = new URL(urlAsString)

  const actualUrlAsString = describedFunction(url)?.toString()

  assert.strictEqual(actualUrlAsString, expectedUrlAsString)
}

function shouldNotDoAnything(
  describedFunction: (url: URL) => URL | null,
  urlAsString: string,
  {
    upperCaseUrlAsString = new URL(urlAsString.toUpperCase()).toString()
  } = {}
) {
  it('should return null', () => shouldReturnNull(describedFunction, urlAsString))
  it('should not change URL', () => shouldNotChangeUrl(describedFunction, urlAsString))
  describe('and URL is upper-case', () => {
    it('should return null', () => shouldReturnNull(describedFunction, upperCaseUrlAsString))
    it('should not change URL', () => shouldNotChangeUrl(describedFunction, upperCaseUrlAsString))
  })
}

function shouldChangeUrlAndReturnIt(
  describedFunction: (url: URL) => URL | null,
  urlAsString: string,
  expectedUrlAsString: string,
  {
    upperCaseExpectedUrlAsString = new URL(expectedUrlAsString.toUpperCase()).toString(),
    upperCaseUrlAsString = new URL(urlAsString.toUpperCase()).toString()
  } = {}
) {
  it('should change URL', () => shouldChangeUrl(describedFunction, urlAsString, expectedUrlAsString))
  it('should return changed URL', () => shouldReturnChangedUrl(describedFunction, urlAsString, expectedUrlAsString))
  describe('and URL is upper-case', () => {
    it(
      'should change URL',
      () => shouldChangeUrl(describedFunction, upperCaseUrlAsString, upperCaseExpectedUrlAsString)
    )
    it(
      'should return changed URL',
      () => shouldReturnChangedUrl(describedFunction, upperCaseUrlAsString, upperCaseExpectedUrlAsString)
    )
  })
}

describe('ForceEnglishContent', () => {
  describe('rewriteMicrosoftDocsUrl()', () => {
    const describedFunction = REWRITES['*://docs.microsoft.com/*']

    describe('when the domain does not match', () => {
      const urlAsString = 'https://www.microsoft.com'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when the are no URL pathname fragments', () => {
      const urlAsString = 'https://docs.microsoft.com'
      const expectedUrlAsString = 'https://docs.microsoft.com/en-us/'
      const upperCaseExpectedUrlAsString = 'https://docs.microsoft.com/en-us/'
      const upperCaseOptions = { upperCaseExpectedUrlAsString }

      shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
    })
    describe('when the first URL pathname fragment is "en-us"', () => {
      const urlAsString = 'https://docs.microsoft.com/en-us'

      shouldNotDoAnything(describedFunction, urlAsString)
      describe('and there are more pathname fragments', () => {
        const urlAsString = 'https://docs.microsoft.com/en-us/one/two/three'

        shouldNotDoAnything(describedFunction, urlAsString)
      })
    })
    describe('when the first URL pathname fragment is "it-it"', () => {
      const urlAsString = 'https://docs.microsoft.com/it-it'
      const expectedUrlAsString = 'https://docs.microsoft.com/en-us'
      const upperCaseExpectedUrlAsString = 'https://docs.microsoft.com/en-us'
      const upperCaseOptions = { upperCaseExpectedUrlAsString }

      shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
      describe('and there are more pathname fragments', () => {
        const urlAsString = 'https://docs.microsoft.com/it-it/one/two/three'
        const expectedUrlAsString = 'https://docs.microsoft.com/en-us/one/two/three'
        const upperCaseExpectedUrlAsString = 'https://docs.microsoft.com/en-us/ONE/TWO/THREE'
        const upperCaseOptions = { upperCaseExpectedUrlAsString }

        shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
      })
    })
  })

  describe('rewriteMicrosoftLearnUrl()', () => {
    const describedFunction = REWRITES['*://learn.microsoft.com/*']

    describe('when the domain does not match', () => {
      const urlAsString = 'https://www.microsoft.com'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when the are no URL pathname fragments', () => {
      const urlAsString = 'https://learn.microsoft.com'
      const expectedUrlAsString = 'https://learn.microsoft.com/en-us/'
      const upperCaseExpectedUrlAsString = 'https://learn.microsoft.com/en-us/'
      const upperCaseOptions = { upperCaseExpectedUrlAsString }

      shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
    })
    describe('when the first URL pathname fragment is "en-us"', () => {
      const urlAsString = 'https://learn.microsoft.com/en-us'

      shouldNotDoAnything(describedFunction, urlAsString)
      describe('and there are more pathname fragments', () => {
        const urlAsString = 'https://learn.microsoft.com/en-us/one/two/three'

        shouldNotDoAnything(describedFunction, urlAsString)
      })
    })
    describe('when the first URL pathname fragment is "it-it"', () => {
      const urlAsString = 'https://learn.microsoft.com/it-it'
      const expectedUrlAsString = 'https://learn.microsoft.com/en-us'
      const upperCaseExpectedUrlAsString = 'https://learn.microsoft.com/en-us'
      const upperCaseOptions = { upperCaseExpectedUrlAsString }

      shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
      describe('and there are more pathname fragments', () => {
        const urlAsString = 'https://learn.microsoft.com/it-it/one/two/three'
        const expectedUrlAsString = 'https://learn.microsoft.com/en-us/one/two/three'
        const upperCaseExpectedUrlAsString = 'https://learn.microsoft.com/en-us/ONE/TWO/THREE'
        const upperCaseOptions = { upperCaseExpectedUrlAsString }

        shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
      })
    })
  })

  describe('rewriteMozillaMdnUrl()', () => {
    const describedFunction = REWRITES['*://developer.mozilla.org/*']

    describe('when the domain does not match', () => {
      const urlAsString = 'https://www.mozilla.org'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when the are no URL pathname fragments', () => {
      const urlAsString = 'https://developer.mozilla.org'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when there is one URL pathname fragment', () => {
      const urlAsString = 'https://developer.mozilla.org/one'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when there are two URL pathname fragments', () => {
      const urlAsString = 'https://developer.mozilla.org/one/two'

      shouldNotDoAnything(describedFunction, urlAsString)
      describe('and the second URL pathname fragment is "docs"', () => {
        const urlAsString = 'https://developer.mozilla.org/one/docs'
        const expectedUrlAsString = 'https://developer.mozilla.org/en-US/one/docs'
        const upperCaseExpectedUrlAsString = 'https://developer.mozilla.org/en-US/ONE/DOCS'
        const upperCaseOptions = { upperCaseExpectedUrlAsString }

        shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
      })
      describe('and the first URL pathname fragment is "en-US"', () => {
        const urlAsString = 'https://developer.mozilla.org/en-US/docs'

        shouldNotDoAnything(describedFunction, urlAsString)
      })
      describe('and the first URL pathname fragment is "it-IT"', () => {
        const urlAsString = 'https://developer.mozilla.org/it-IT/docs'
        const expectedUrlAsString = 'https://developer.mozilla.org/en-US/docs'
        const upperCaseExpectedUrlAsString = 'https://developer.mozilla.org/en-US/DOCS'
        const upperCaseOptions = { upperCaseExpectedUrlAsString }

        shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
      })
      describe('and the first URL pathname fragment is "es"', () => {
        const urlAsString = 'https://developer.mozilla.org/es/docs'
        const expectedUrlAsString = 'https://developer.mozilla.org/en-US/docs'
        const upperCaseExpectedUrlAsString = 'https://developer.mozilla.org/en-US/DOCS'
        const upperCaseOptions = { upperCaseExpectedUrlAsString }

        shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
      })
    })

    describe('when there are three URL pathname fragments', () => {
      const urlAsString = 'https://developer.mozilla.org/one/two/three'

      shouldNotDoAnything(describedFunction, urlAsString)
      describe('and the second URL pathname fragment is "docs"', () => {
        const urlAsString = 'https://developer.mozilla.org/one/docs/three'
        const expectedUrlAsString = 'https://developer.mozilla.org/en-US/one/docs/three'
        const upperCaseExpectedUrlAsString = 'https://developer.mozilla.org/en-US/ONE/DOCS/THREE'
        const upperCaseOptions = { upperCaseExpectedUrlAsString }

        shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
        describe('and the first URL pathname fragment is "en-US"', () => {
          const urlAsString = 'https://developer.mozilla.org/en-US/docs/three'

          shouldNotDoAnything(describedFunction, urlAsString)
        })
        describe('and the first URL pathname fragment is "it-IT"', () => {
          const urlAsString = 'https://developer.mozilla.org/it-IT/docs/three'
          const expectedUrlAsString = 'https://developer.mozilla.org/en-US/docs/three'
          const upperCaseExpectedUrlAsString = 'https://developer.mozilla.org/en-US/DOCS/THREE'
          const upperCaseOptions = { upperCaseExpectedUrlAsString }

          shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
        })
        describe('and the first URL pathname fragment is "es"', () => {
          const urlAsString = 'https://developer.mozilla.org/es/docs/three'
          const expectedUrlAsString = 'https://developer.mozilla.org/en-US/docs/three'
          const upperCaseExpectedUrlAsString = 'https://developer.mozilla.org/en-US/DOCS/THREE'
          const upperCaseOptions = { upperCaseExpectedUrlAsString }

          shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
        })
      })
    })
  })

  describe('rewriteReactJsUrl()', () => {
    const describedFunction = REWRITES['*://*.reactjs.org/*']

    describe('when the domain does not match', () => {
      const urlAsString = 'https://it.reactjs.com'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when there are no subdomain fragments', () => {
      const urlAsString = 'https://reactjs.org'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when there are two subdomain fragments', () => {
      const urlAsString = 'https://one.two.reactjs.org'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when the subdomain is too long', () => {
      const urlAsString = 'https://www.reactjs.org'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when the subdomain is "en"', () => {
      const urlAsString = 'https://en.reactjs.org'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when the subdomain is "it"', () => {
      const urlAsString = 'https://it.reactjs.org/'
      const expectedUrlAsString = 'https://en.reactjs.org/'

      shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString)
    })
  })

  describe('rewriteFacebookDevelopersUrl()', () => {
    const describedFunction = REWRITES['*://developers.facebook.com/*']

    describe('when the domain does not match', () => {
      const urlAsString = 'https://developer.facebook.com'

      shouldNotDoAnything(describedFunction, urlAsString)
    })
    describe('when there is no "locale" search param', () => {
      const urlAsString = 'https://developers.facebook.com/'
      const expectedUrlAsString = 'https://developers.facebook.com/?locale=en_US'
      const upperCaseUrlAsString = 'https://developers.facebook.com/'
      const upperCaseExpectedUrlAsString = 'https://developers.facebook.com/?locale=en_US'
      const upperCaseOptions = { upperCaseExpectedUrlAsString, upperCaseUrlAsString }

      shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
    })
    describe('when there is a "locale=en_US" search param', () => {
      const urlAsString = 'https://developers.facebook.com/?locale=en_US'
      const upperCaseUrlAsString = urlAsString

      shouldNotDoAnything(describedFunction, urlAsString, { upperCaseUrlAsString })
    })
    describe('when there is a "locale=it_IT" search param', () => {
      const urlAsString = 'https://developers.facebook.com/?locale=it_IT'
      const expectedUrlAsString = 'https://developers.facebook.com/?locale=en_US'
      const upperCaseUrlAsString = 'https://developers.facebook.com/?locale=IT_IT'
      const upperCaseExpectedUrlAsString = 'https://developers.facebook.com/?locale=en_US'
      const upperCaseOptions = { upperCaseExpectedUrlAsString, upperCaseUrlAsString }

      shouldChangeUrlAndReturnIt(describedFunction, urlAsString, expectedUrlAsString, upperCaseOptions)
    })
  })
})
