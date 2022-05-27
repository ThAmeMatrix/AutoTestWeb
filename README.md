# AutoTestWeb
自动化测试平台的web

### :rocket: Getting Started

#### Project setup

```bash
npm install
```

#### Compiles and hot-reloads for development

```bash
npm run serve
```

:tada: Open http://localhost:8090 to see the project.

If [hot reload](https://vue-loader.vuejs.org/guide/hot-reload.html#state-preservation-rules) fails,
modify your `vue.config.js`

```javascript
module.exports = {
  chainWebpack: config => {
    config.resolve
      .symlinks(true)
  }
}
```

or replace `cnpm` with `npm`

`npm config set registry https://registry.npm.taobao.org`

#### Compiles and minifies for production

```bash
npm run build
```

#### Lints and fixes files

```bash
npm run lint
```
