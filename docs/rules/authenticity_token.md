# `<input name="authenticity_token">`

The Rails `form_tag` helper creates a `<form>` element with a `<input name="authenticity_token">` child element. The authenticity-token input tag contains a [Cross-Site Request Forgery (CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29) token that is verified by the Rails app when the form is submitted.

An attacker who is able to steal a user's CSRF token can perform a CSRF attack against that user. To reduce this risk, GitHub uses per-form CSRF tokens. This means that a form's method and action are embedded in that form's CSRF token. When the form is submitted, the Rails application verifies that the request's path and method match those of the CSRF token: A stolen token for the `POST /preview` endpoint will not be accepted for the `DELETE /github/github` endpoint.

## CSRF tokens in JavaScript

Requests initiated by JavaScript using XHR or Fetch still need to include a CSRF token. Prior to our use of per-form tokens, a common pattern for getting a valid CSRF token to include in a request was

```JavaScript
const csrfToken = this.closest('form').elements['authenticity_token'].value
```

Unless the JavaScript's request is for the same method/action as the form from which it takes the CSRF token, this CSRF token will *not*  be accepted by the Rails application.

The preferred way to make an HTTP request with JavaScript is to use the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) API to serialize the input elements of a form:

```rhtml
<%= form_tag "/my/endpoint" do %>
  <input type="hidden" name="my_field" value="my value">
  <button class="js-my-button">Click Me!</button>
<% end %>
```

```JavaScript
on('click', '.js-my-button', function(e) {
  const form = this.closest('form')

  fetch(form.action, {
    method: form.method,
    body: new FormData(form)
  }).then(function() {
    alert("Success!")
  })

  e.preventDefault()
})
```

An alternate, but less preferred approach is to include the CSRF token in a data-attribute:

```rhtml
<%
  path = some_action_path(some_params)
  token = authenticity_token_for(path, method: :put)
%>
<button class='js-my-button' data-url="<%= path %>" data-authenticity-token="<%= token %>">Click Me!</button>
```

```JavaScript
on('click', '.js-my-button', function(e) {
  const data = new FormData()
  data.append('authenticity_token', this.getAttribute('data-authenticity-token'))

  fetch(this.getAttribute('data-url'), {
    method: 'put',
    body: data
  }).then(function() {
    alert("Success!")
  })

  e.preventDefault()
})
```
