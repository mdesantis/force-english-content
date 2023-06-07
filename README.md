<div align="center">

<img src="https://raw.githubusercontent.com/mdesantis/force-english-content/main/icon.svg?sanitize=true" height="100" alt="Logo of the project"/>

# [Force English Content](https://github.com/mdesantis/force-english-content#readme)

[![Mozilla Add-on](https://img.shields.io/amo/v/%7B45b75146-960d-47e4-b45f-c642ae8a336d%7D)](https://addons.mozilla.org/firefox/addon/force-english-content/)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/kglfhodlninopcgjohfeephcddibbome)](https://chrome.google.com/webstore/detail/force-english-content/kglfhodlninopcgjohfeephcddibbome/)
[![License](https://img.shields.io/github/license/mdesantis/force-english-content)](https://github.com/mdesantis/force-english-content#licensing)
[![CI](https://img.shields.io/github/actions/workflow/status/mdesantis/force-english-content/.github/workflows/ci.yml?branch=main)](https://github.com/mdesantis/force-english-content/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/gh/mdesantis/force-english-content)](https://app.codecov.io/gh/mdesantis/force-english-content)

</div>

> Forces localised web pages with poor or outdated translations to redirect to
> the original English content.

Developer documentation content from
[many popular websites serving technical documentation](#supported-sites) is
offered in many different languages. While this is normally a welcome idea, it
is badly implemented by nagging the user with all sorts of changing messages and
popups in translated content. Even worse, much of the content is simply
machine-translated these days, making it hard to understand and sometimes
completely incomprehensible. And even if you're lucky to find old content that
was manually translated, it is often out of date and nobody tells you. This has
led to misunderstandings in internet discussions more often than not, when I was
served a completely different meaning than others that were accessing updated
and corrected English content.

This extension fixes all these problems. Whenever it sees you accessing a
localised site, it swiftly redirects you to the original content so that you get
the most accurate information available. Redirection is performed quickly before
you even reach out to the server for the localised site.

The only requirement that this extension imposes on you is that you should be
able to understand English developer documentation easily. I consider this a
necessity anyway. So have fun instead of being confused! :gb:

## Supported sites

- [docs.microsoft.com](https://docs.microsoft.com)
- [learn.microsoft.com](https://learn.microsoft.com)
- [developer.mozilla.org/docs](https://developer.mozilla.org/docs)
- [legacy.reactjs.org](https://legacy.reactjs.org)
- [developers.facebook.com](https://developers.facebook.com)
- [www.php.net/manual](https://www.php.net/manual)
- [docs.python.org](https://docs.python.org)
- [_**Whatever!**_](https://github.com/mdesantis/force-english-content/issues/new?labels=enhancement&title=Add%20support%20for%20www.example.com&body=Hello!%20Is%20it%20possible%20to%20rewrite%20%60http%3A%2F%2Fwww.example.com%60%20to%20%60http%3A%2F%2Fwww.example.com/en-US%60%3F%20Thanks!)

## Installation

- Chrome Web Store:
  https://chrome.google.com/webstore/detail/force-english-content/kglfhodlninopcgjohfeephcddibbome/
- Mozilla Add-on:
  https://addons.mozilla.org/firefox/addon/force-english-content/

## Development

### Dependencies

This project uses Bash for [scripts](./scripts), jq for the
[bump manifest version script](./scripts/update-manifests-extension-version.sh),
and Inkscape for the [build icons script](./scripts/build-icons.sh).

### Setup on Ubuntu

There is a setup script for Ubuntu which prepares your machine for development:

```sh
./script/setup-ubuntu.sh
```

### Setup on other OSes

Install Bash, jq, Inkscape and NodeJS and you're good to go.

### Workflow

Make your changes, then run:

```sh
npx nyc npm test && npm run build && npm run lint
```

#### Releasing

Use `npm version`, e.g.:

```sh
npm version patch
```

## Contributing

Contributions are welcome and straightforward to submit, as this is a one-man
project. Just open an
[issue](/https://github.com/mdesantis/force-english-content/issues) or create a
[pull request](https://github.com/mdesantis/force-english-content/pulls)
directly.

## Acknowledgements

This extension is a revamp of
[English Content](https://addons.mozilla.org/it/firefox/addon/english-content)
by [Yves Goergen](https://addons.mozilla.org/it/firefox/user/2296386/), to which
I stole the main idea and the description above, as it is much better than any
decription I could come up with. Thanks Yves!

## Licensing

The code in this project is licensed under [MPL 2.0 license](LICENSE).
