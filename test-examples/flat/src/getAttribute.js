function foobar(el) {
  el.getAttribute('autoComplete')
}

const title = document.createElement('h1')
title.textContent = `${title}!`

foobar(title)

document.addEventListener('click', async function (event) {
  const data = await fetch()

  event.preventDefault()
})
