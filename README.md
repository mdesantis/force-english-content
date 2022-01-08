<p align="center">
  <img src="https://raw.githubusercontent.com/mdesantis/force-english-content/main/icon.svg?sanitize=true" height="100" alt="Logo of the project"/>
</p>

# [Force English Content](https://github.com/mdesantis/force-english-content#readme)

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
necessity anyway. So have fun instead of being confused!

## Features

- Redirects `https://docs.microsoft.com` to `https://docs.microsoft.com/en-us`
- Redirects `https://docs.microsoft.com/{non-en-locale}/*` to
  `https://docs.microsoft.com/en-us/*`
- Redirects `https://developer.mozilla.org/{non-en-locale}/docs/*` to
  `https://developer.mozilla.org/en-US/docs/*`
- Redirects `https://{non-en-locale}.reactjs.org/*` to `https://reactjs.org/*`
- Redirects `https://developer.facebook.com/*` to
  `https://developer.facebook.com/*?locale=en_US`

## Development

### Dependencies

This project uses `bash` for [scripts](./scripts), `sed` for the [change version
script](./scripts/change-version.sh), and Inkscape for the [build icons
script](./scripts/build-icons.sh).

### Setup on Ubuntu

There is a setup script for Ubuntu which prepares your machine for development:

```sh
./script/setup-ubuntu.sh
```

### Setup on other OSes

Install Bash, Sed, Inkscape and NodeJS and you're good to go.

## Acknowledgements

This extension is a revamp of [English
Content](https://addons.mozilla.org/it/firefox/addon/english-content) by [Yves
Goergen](https://addons.mozilla.org/it/firefox/user/2296386/), to which I stole
the main idea and the description above, as it is much better than any
decription I could come up with. Thanks Yves!

## Licensing

The code in this project is licensed under [MPL 2.0 license](LICENSE).
