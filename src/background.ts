import browser from 'webextension-polyfill'

import {
  rewriteFacebookDevelopersUrl,
  rewriteMicrosoftDocsUrl,
  rewriteMozillaMdnUrl,
  rewriteReactJsUrl
} from './rewrites'

type OnBeforeRequestListenerParametersType = Parameters<typeof browser.webRequest.onBeforeRequest.addListener>
type OnBeforeRequestListenerCallbackType = OnBeforeRequestListenerParametersType[0]
type OnBeforeRequestFilterType = OnBeforeRequestListenerParametersType[1]
type OnBeforeRequestOptionsType = OnBeforeRequestListenerParametersType[2]
type OnBeforeRequestDetailsType = Parameters<OnBeforeRequestListenerCallbackType>[0]

function handleBeforeRequest({ 'url': urlAsString }: OnBeforeRequestDetailsType) {
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

  return undefined
}

export default function start() {
  const urls = [
    '*://docs.microsoft.com/*',
    '*://developer.mozilla.org/*',
    '*://*.reactjs.org/*',
    '*://developers.facebook.com/*'
  ]
  const listener = handleBeforeRequest
  const filter: OnBeforeRequestFilterType = { 'types': ['main_frame'], urls }
  const extraInfoSpec: OnBeforeRequestOptionsType = ['blocking']

  browser.webRequest.onBeforeRequest.addListener(listener, filter, extraInfoSpec)
}

start()
