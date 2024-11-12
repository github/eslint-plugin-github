function foobar(el) {
  el.getAttribute('autoComplete')
}

const title = document.createElement('h1')
title.textContent = `${title}!`

foobar(title)
