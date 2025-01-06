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

window.addEventListener(
  'scroll',
  () => {
    console.log('Scroll event fired!')
  },
  {passive: true},
)

document.addEventListener('click', async function (event) {
  // event.currentTarget will be an HTMLElement
  const url = event.currentTarget.getAttribute('data-url')
  const data = await fetch(url)

  // But now, event.currentTarget will be null
  const text = event.currentTarget.getAttribute('data-text')
  // ...
})
