### alfred-btdigg-workflow
----
workflow script for btdigg search for alfred v2

### requirement
* macos
* nodejs
* alfred v2

### install
* install alfred v2
* download [Btdigg Link Copy.alfredworkflow](https://github.com/rehorn/alfred-btdigg-workflow/blob/master/Btdigg%20Link%20Copy.alfredworkflow?raw=true)
* double click

### install via npm
```
npm install -g alfred-btdigg-workflow
```

### issues: proxy needed to visit btdigg!
* open alfred v2 preference -> workflow tab
* select "Btdigg Link Copy" workflow
* double click 'bt' script filter node -> Open workflow folder
* open 'index.js' and edit proxy setting 
```javascript
// request by http proxy
// proxy: '',
// request by socks5
agent: new socks5Agent({
    socksHost: '127.0.0.1',
    socksPort: 1080
})
``` 
