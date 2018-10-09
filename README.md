# koa2 todo demo server

## explain

A todo demo server written koa2. Supports only two features:

* Loading open todos by: GET /api/v1/todo
Result
```json
   [{id:'string',name:'string',unitl:'string'"},...]
```
* Add a new todo by: POST /api/v1/todo
```json
 {id: id, name: 'string', until: 'string'}
```
## usage

first, install missing npm packages

```shell
npm install
```

then, run

```shell
npm start
```
