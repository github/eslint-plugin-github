(function() {
  this.a = 0;
  baz(() => this);
})()

function foo() {
  this.a = 0;
  baz(() => this)
}

var foo = function() {
  this.a = 0;
  var message = "Some message text"
  baz(() => this);
}