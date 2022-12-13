import browser from 'webextension-polyfill'

import {
  rewriteFacebookDevelopersUrl,
  rewriteMicrosoftDocsUrl,
  rewriteMicrosoftLearnUrl,
  rewriteMozillaMdnUrl,
  rewriteReactJsUrl
} from './rewrites'

type OnBeforeRequestListenerParametersType = Parameters<typeof browser.webRequest.onBeforeRequest.addListener>
type OnBeforeRequestListenerCallbackType = OnBeforeRequestListenerParametersType[0]
type OnBeforeRequestFilterType = OnBeforeRequestListenerParametersType[1]
type OnBeforeRequestOptionsType = OnBeforeRequestListenerParametersType[2]
type OnBeforeRequestDetailsType = Parameters<OnBeforeRequestListenerCallbackType>[0]

function handleBeforeRequest({ tabId, 'url': urlAsString }: OnBeforeRequestDetailsType) {
  const url = new URL(urlAsString)

  const rewrittenUrlFns = [
    rewriteMicrosoftDocsUrl,
    rewriteMicrosoftLearnUrl,
    rewriteMozillaMdnUrl,
    rewriteReactJsUrl,
    rewriteFacebookDevelopersUrl
  ]

  for (const rewrittenUrlFn of rewrittenUrlFns) {
    const redirectUrl = rewrittenUrlFn(url)

    if (redirectUrl) {
      browser.tabs.update(tabId, { 'url': redirectUrl.toString() })
      return undefined
    }
  }

  return undefined
}

export default function start() {
  const urls = [
    '*://docs.microsoft.com/*',
    '*://learn.microsoft.com/*',
    '*://developer.mozilla.org/*',
    '*://*.reactjs.org/*',
    '*://developers.facebook.com/*'
  ]
  const listener = handleBeforeRequest
  const filter: OnBeforeRequestFilterType = { 'types': ['main_frame'], urls }
  const extraInfoSpec: OnBeforeRequestOptionsType = []

  browser.webRequest.onBeforeRequest.addListener(listener, filter, extraInfoSpec)
}

start()
