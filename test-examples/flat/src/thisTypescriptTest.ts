class Safe {
  contents: string;

  constructor(contents: string) {
    this.contents = contents;
  }

  printContents() {
    console.log(this.contents);
  }
}

var foo = function() {
  this.a = 0;
  baz(() => this);
};
