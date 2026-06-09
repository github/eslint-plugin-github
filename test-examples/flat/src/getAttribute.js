function foobar(el) {
  return el.getAttribute('autocomplete')
}

const heading = document.createElement('h1')
heading.textContent = 'GitHub'

foobar(heading)

document.addEventListener('click', function (event) {
  event.preventDefault()
})

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    entry.target.getAttribute('data-url')
  }
})

observer.observe(document.body)

document.addEventListener('click', async function (event) {
  const currentTarget = event.currentTarget
  const url = currentTarget.getAttribute('data-url')
  const response = await fetch(url)

  return response.text()
})
