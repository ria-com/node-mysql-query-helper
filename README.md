node-mysql-query-helper
=======================
Simple helper which can help you to build MySQL queries

Usage example
=============
```javascript
var mysqlHelper = require('node-mysql-query-helper');
mysqlHelper.where({foo: 'bar', baz: [0,1]}); // --> foo=? AND baz IN (?) 
mysqlHelper.set({foo: 'bar', baz: 'baf'}); // --> foo=?, baz=? 
mysqlHelper.order({foo: 'desc', baz: 'asc'}); // --> foo desc, baz asc 
```