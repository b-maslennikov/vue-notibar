# Vue Notibar (Notification bar)

<p align="center">
  <a href="https://ci.appveyor.com/project/b-maslennikov/vue-notibar"><img src="https://img.shields.io/appveyor/build/b-maslennikov/vue-notibar/master?style=flat-square" alt="AppVeyor Build Status" /></a> 
  <a href="https://ci.appveyor.com/project/b-maslennikov/vue-notibar/build/tests"><img src="https://img.shields.io/appveyor/tests/b-maslennikov/vue-notibar/master?style=flat-square" alt="AppVeyor Tests" /></a>  
</p>

# Installation
Using npm
```console
npm install --save vue-notibar
```

or CDN
```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-notibar/dist/vue-notibar.js"></script>
```

# Usage
```javascript
import Vue from 'vue'
import VueNotibar from 'vue-notibar'

Vue.use(VueNotibar, options)
```

## Default options
```javascript
{
	textColor: '#FFFFFF',
	backgroundColor: '#323232',
	time: 5000,
	position: 'center'
}
```

# Live demo
<a href="https://jsfiddle.net/tattdogg/gmnfqz98/" target="_blank">JSFiddle</a>