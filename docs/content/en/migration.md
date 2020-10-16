---
title: 'Migration guides'
description: 'Migrate with confidence from one major version to another with our migrations guides.'
position: 7
category: 'Migration'
---

### From 4.x to 5.x

**BaseURL options and handling have been completely rewritten.**

Please refer to the latest docs.

**Default prefix is now `/` instead of `/api`.**

You have to explicitly add `/api/` in all requests.

**`credentials` is now disabled by default.**

For using old defaults:

```js
{
  axios: {
    prefix: '/api',
    credentials: true
  }
}
```

**Default error interceptor removed**

**All lifecycle functions removed**

You can now easily use a plugin to extend axios and add your custom logic there.

Please see [Extending Axios](https://axios.nuxtjs.org/extend) section in docs.
