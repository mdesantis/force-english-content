<p align="center">
  <img src="https://raw.githubusercontent.com/mdesantis/force-english-content/main/icon.svg?sanitize=true" height="100" alt="Logo of the project"/>
</p>

# [Force English Content](https://github.com/mdesantis/force-english-content#readme)

<p align="center">
  <a href="https://addons.mozilla.org/firefox/addon/force-english-content/">
    <img alt="Mozilla Add-on" src="https://img.shields.io/amo/v/%7B45b75146-960d-47e4-b45f-c642ae8a336d%7D"></a>
  <a href="https://chrome.google.com/webstore/detail/force-english-content/kglfhodlninopcgjohfeephcddibbome/">
    <img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/kglfhodlninopcgjohfeephcddibbome"></a>
  <a href="https://github.com/mdesantis/force-english-content#licensing">
    <img alt="License" src="https://img.shields.io/github/license/mdesantis/force-english-content"></a>
  <a href="https://github.com/mdesantis/force-english-content/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/mdesantis/force-english-content/CI"></a>
  <a href="https://app.codecov.io/gh/mdesantis/force-english-content">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/gh/mdesantis/force-english-content"></a>
  <a href="https://github.com/mdesantis/force-english-content/blob/main/manifest.json">
    <img alt="manifest.json permissions" src="https://img.shields.io/github/manifest-json/permissions/mdesantis/force-english-content"></a>
</p>



> Forces localised web pages with poor or outdated translations to redirect to
> the original English content.

Developer documentation content from many popular websites serving technical
documentation—[Microsoft Docs](https://docs.microsoft.com), [Mozilla
MDN](https://developer.mozilla.org), [ReactJS](https://reactjs.org), [Facebook
Developers](https://developers.facebook.com)—is offered in many different
languages. While this is normally a welcome idea, it is badly implemented by
nagging the user with all sorts of changing messages and popups in translated
content. Even worse, much of the content is simply machine-translated these
days, making it hard to understand and sometimes completely incomprehensible.
And even if you're lucky to find old content that was manually translated, it is
often out of date and nobody tells you. This has led to misunderstandings in
internet discussions more often than not, when I was served a completely
different meaning than others that were accessing updated and corrected English
content.

This extension fixes all these problems. Whenever it sees you accessing a
localised site, it swiftly redirects you to the original content so that you get
the most accurate information available. This works for direct access to
docs.microsoft.com, also from web search results, as well as the online
help search initiated through the Visual Studio code editor by pressing
<kbd>F1</kbd>. Redirection is performed quickly before you even reach out to the
server for the localised site.

The only requirement that this extension imposes on you is that you should be
able to understand English developer documentation easily. I consider this a
necessity anyway. So have fun instead of being confused! :gb:

## Features

- Redirects `https://docs.microsoft.com` to `https://docs.microsoft.com/en-us`
- Redirects `https://docs.microsoft.com/{non-en-locale}/*` to
  `https://docs.microsoft.com/en-us/*`
- Redirects `https://developer.mozilla.org/{non-en-locale}/docs/*` to
  `https://developer.mozilla.org/en-US/docs/*`
- Redirects `https://{non-en-locale}.reactjs.org/*` to `https://reactjs.org/*`
- Redirects `https://developer.facebook.com/*` to
  `https://developer.facebook.com/*?locale=en_US`

## Installation

- Chrome Web Store: https://chrome.google.com/webstore/detail/force-english-content/kglfhodlninopcgjohfeephcddibbome/
- Mozilla Add-on: https://addons.mozilla.org/firefox/addon/force-english-content/

## Development

### Dependencies

This project uses Bash for [scripts](./scripts), jq for the [bump manifest
version script](./scripts/bump-manifest-version.sh), and Inkscape for the [build
icons script](./scripts/build-icons.sh).

### Setup on Ubuntu

There is a setup script for Ubuntu which prepares your machine for development:

```sh
./script/setup-ubuntu.sh
```

### Setup on other OSes

Install Bash, jq, Inkscape and NodeJS and you're good to go.

## Contributing

See [Contributing](CONTRIBUTING.md).

## Acknowledgements

This extension is a revamp of [English
Content](https://addons.mozilla.org/it/firefox/addon/english-content) by [Yves
Goergen](https://addons.mozilla.org/it/firefox/user/2296386/), to which I stole
the main idea and the description above, as it is much better than any
decription I could come up with. Thanks Yves!

## Licensing

The code in this project is licensed under [MPL 2.0 license](LICENSE).
