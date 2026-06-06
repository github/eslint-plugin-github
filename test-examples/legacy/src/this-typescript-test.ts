export class Safe {
  contents: string

  constructor(contents: string) {
    this.contents = contents
  }

  printContents() {
    return this.contents
  }
}

export function foo() {
  return new Safe('contents')
}
