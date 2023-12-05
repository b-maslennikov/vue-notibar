<p align="center" style="font-size:32px">Vue 2 Notibar</p>
<p align="center" style="font-size:18px">Customizable notification bar</p>
<hr>
<br>

<p align="center">
	<a href="https://ci.appveyor.com/project/b-maslennikov/vue-notibar"><img alt="AppVeyor Build Status" src="https://img.shields.io/appveyor/build/b-maslennikov/vue-notibar/master?style=flat-square" /></a> 
	<a href="https://ci.appveyor.com/project/b-maslennikov/vue-notibar/build/tests"><img alt="AppVeyor Tests" src="https://img.shields.io/appveyor/tests/b-maslennikov/vue-notibar/master?style=flat-square" /></a>
	<a href="https://unpkg.com/vue-notibar/dist/vue-notibar.min.js"><img alt="Minimized fiel size" src="https://img.shields.io/github/size/b-maslennikov/vue-notibar/dist/vue-notibar.min.js?style=flat-square"></a>
	<a href="https://www.npmjs.com/package/vue-notibar"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/vue-notibar?style=flat-square"></a>
	<a href="https://www.npmjs.com/package/vue-notibar"><img alt="Latest version" src="https://img.shields.io/npm/v/vue-notibar?style=flat-square"></a>
	<a href="https://www.npmjs.com/package/vue-notibar"><img alt="License" src="https://img.shields.io/npm/l/vue-notibar?style=flat-square"></a>
</p>

# Installation
Using npm
```shell
$ npm i vue-notibar
```

or CDN
```html
<script src="https://unpkg.com/vue@2.7.15/dist/vue.min.js"></script>
<script src="https://unpkg.com/vue-notibar/dist/vue-notibar.min.js"></script>
```

# Usage
```javascript
import Vue from 'vue'
import VueNotibar from 'vue-notibar'

Vue.use(VueNotibar)
// or with options
Vue.use(VueNotibar, options)

this.$notibar.add('message')
// or with options
this.$notibar.add('message', options)
```

# Options
```javascript
{
    textColor: String,        // default '#FFFFFF'
    backgroundColor: String,  // default '#323232'
    time: Number,             // default 5000. Set null to disable timeout
    position: String,         // default 'center'. Possible values: 'left', 'center', 'right'
    dismiss: {
        show: Boolean,        // default false
        color: String,        // default '#FFFFFF'
    }
}
```

# Live demo
<a href="https://jsfiddle.net/tattdogg/gmnfqz98/" target="_blank">JSFiddle</a>