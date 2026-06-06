export function focusInput() {
  const textField = document.getElementById('sampleText')

  textField.focus()

  setTimeout(() => {
    textField.focus()
  }, 3000)
}
