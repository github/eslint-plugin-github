# No unused modules

This rule means the module was not imported by any other modules and may not be used.

## Missing import

The module might be new and the file just needs to be imported by another module to be activated.

## Dead code

The module may be dead code if the last dependent module was removed. In this case, the module can be deleted. Ensure the module does not have any initialization side effects that may still be used.

## Entry

The module may intended to be a public entry point which is imported by code outside of this package. In this case, the module should be designated as an entry by TODO.
