function focusInput() {
  const textField = document.getElementById("sampleText")

  textField.focus()

  setTimeout(() => {
    textField.blur()
  }, 3000)
}