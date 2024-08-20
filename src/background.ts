import browser from 'webextension-polyfill'

import REWRITES from './rewrites'

type OnBeforeRequestListenerParametersType = Parameters<typeof browser.webRequest.onBeforeRequest.addListener>
type OnBeforeRequestListenerCallbackType = OnBeforeRequestListenerParametersType[0]
type OnBeforeRequestFilterType = OnBeforeRequestListenerParametersType[1]
type OnBeforeRequestOptionsType = OnBeforeRequestListenerParametersType[2]
type OnBeforeRequestDetailsType = Parameters<OnBeforeRequestListenerCallbackType>[0]

const rewriteUrlFns = Object.values(REWRITES)
const filterUrls = Object.keys(REWRITES)

function handleBeforeRequest({ tabId, 'url': urlAsString }: OnBeforeRequestDetailsType) {
  const url = new URL(urlAsString)

  for (const rewriteUrlFn of rewriteUrlFns) {
    const redirectUrl = rewriteUrlFn(url)

    if (redirectUrl) {
      browser.tabs.update(tabId, { 'url': redirectUrl.toString() }).catch(() => {
        // [Mozilla says](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/update#return_value):
        // > If the tab could not be found or some other error occurs, the promise will be rejected with an error
        // > message.
        // We don't need to do anything in those cases.
      })
      return undefined
    }
  }

  return undefined
}

export default function start() {
  const listener = handleBeforeRequest
  const filter: OnBeforeRequestFilterType = { 'types': ['main_frame'], 'urls': filterUrls }
  const extraInfoSpec: OnBeforeRequestOptionsType = []

  browser.webRequest.onBeforeRequest.addListener(listener, filter, extraInfoSpec)
}

start()
