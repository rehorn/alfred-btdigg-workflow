### alfred-btdigg-workflow
----
workflow script for btdigg search for alfred v2

### requirement
* macos
* alfred v2

### install
* install alfred v2
* download [Btdigg Link Copy.alfredworkflow](https://github.com/rehorn/alfred-btdigg-workflow/blob/master/Btdigg%20Link%20Copy.alfredworkflow?raw=true)
* double click

### issues: btdigg can't visit directly due to some reasons, proxy needed!
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
