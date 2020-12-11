---
title: 'Helpers'
description: 'Discover the helpers to supercharge your Axios instance'
position: 6
category: 'API'
---

Discover the helpers to supercharge your axios instance.

## Interceptors

Axios plugin provides helpers to register axios interceptors easier and faster.

- `onRequest(config)`
- `onResponse(response)`
- `onError(err)`
- `onRequestError(err)`
- `onResponseError(err)`

These functions don't have to return anything by default.

Example: (`plugins/axios.js`)

```js
export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if(error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
```

When intercepting an error, you can return a resolved promise to prevent the error from propagating. 

Example: (`plugins/axios.js`)

```js
export default function ({ $axios, error: nuxtError }) {
  $axios.onError(error => {
    nuxtError({
      statusCode: error.response.status,
      message: error.message,
    });
    return Promise.resolve(false);
  })
}
```

<alert type="info">

Learn more about [extending axios](/extend)

</alert>

## `setBaseURL`

- Signature: `setBaseURL(baseURL)`

Axios instance has an additional helper to easily change baseURL.

Use this when you need a dynamic runtime url. Otherwise use config and environment variables.

**NOTE:** When calling `setBaseURL`, it globally set's baseURL for session (one SSR request or browser tab) so it is adviced to only call it in application entrypoint with a plugin not in components. Subeffects can cause breaking other requests!

Parameters:

* **baseURL**: Base URL which is used and prepended to make requests in server side.

```js
// Set baseURL (both client and server)
this.$axios.setBaseURL('http://api.example.com')

// Change URL only for client
if (process.client) {
  this.$axios.setBaseURL('http://api.example.com')
}

// Change URL only for server
if (process.server) {
  this.$axios.setBaseURL('http://api.example.com')
}
```

## `setHeader`

- Signature: `setHeader(name, value, scopes='common')`

Axios instance has a helper to easily set any header.

Parameters:

* **name**: Name of the header
* **value**: Value of the header
* **scopes**: Send only on specific type of requests. Defaults
  * Type: _Array_ or _String_
  * Defaults to `common` meaning all types of requests
  * Can be `get`, `post`, `delete`, ...

```js
// Adds header: `Authorization: 123` to all requests
this.$axios.setHeader('Authorization', '123')

// Overrides `Authorization` header with new value
this.$axios.setHeader('Authorization', '456')

// Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
  'post'
])

// Removes default Content-Type header from `post` scope
this.$axios.setHeader('Content-Type', false, ['post'])
```

## `setToken`

- Signature: `setToken(token, type, scopes='common')`

Axios instance has an additional helper to easily set global authentication header.

Parameters:

* **token**: Authorization token
* **type**: Authorization token prefix(Usually `Bearer`).
* **scopes**: Send only on specific type of requests. Defaults
  * Type: _Array_ or _String_
  * Defaults to `common` meaning all types of requests
  * Can be `get`, `post`, `delete`, ...

```js
// Adds header: `Authorization: 123` to all requests
this.$axios.setToken('123')

// Overrides `Authorization` header with new value
this.$axios.setToken('456')

// Adds header: `Authorization: Bearer 123` to all requests
this.$axios.setToken('123', 'Bearer')

// Adds header: `Authorization: Bearer 123` to only post and delete requests
this.$axios.setToken('123', 'Bearer', ['post', 'delete'])

// Removes default Authorization header from `common` scope (all requests)
this.$axios.setToken(false)
```
