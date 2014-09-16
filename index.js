var socks5Agent = require('socks5-http-client/lib/Agent');
var request = require('request');
var env = require('jsdom').env;

if (!String.prototype.encodeHTML) {
    String.prototype.encodeHTML = function() {
        return this.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };
}

(function() {
    process.argv.forEach(function(val, idx) {
        if (idx < 2) {
            return;
        }

        function toXml(items) {
            var rs = '<?xml version="1.0"?><items>';
            items.forEach(function(item, idx) {
                var node = '<item uid="btdigg" arg="' + item.link.encodeHTML() + '" >';
                node += '<title>' + item.name + '</title>';
                var subtitle = '';
                item.attrs.forEach(function(attr) {
                    subtitle += attr.name + attr.val + ', ';
                });
                node += '<subtitle>' + subtitle + '</subtitle>';
                node += '<icon>icon.png</icon>';
                node += '</item>';
                rs += node;
            });
            rs += '</items>';
            return rs;
        };

        request({
            url: 'http://btdigg.org/search?q=' + val,
            // request by http proxy
            // proxy: '',
            // request by socks5
            agent: new socks5Agent({
                socksHost: '127.0.0.1',
                socksPort: 1080
            })
        }, function(err, res) {
            if (err) {
                var items = [{
                    name: '接口错误，无法获取搜索结果',
                    link: '',
                    attrs: []
                }];
                return console.log(toXml(items));
            } else {
                env(res.body, function(err, window) {
                    var $ = require('jquery')(window);
                    var container = $('#search_res').children('table').children('tbody').children('tr');
                    var items = [];
                    container.each(function() {
                        var name = $('.torrent_name:first', this).text();
                        var link = $('.torrent_name_tbl .ttth a:first', this).attr('href');
                        var tr = $('.torrent_name_tbl:eq(1) tr:first');
                        var attrsArr = [];
                        var item = {
                            name: name,
                            link: link
                        };
                        $('td', tr).each(function(idx, el) {
                            if (idx > 1 && idx < 5) {
                                var attr = {
                                    name: $('.attr_name', el).text(),
                                    val: $('.attr_val', el).text()
                                };
                                attrsArr.push(attr);
                            }
                        });
                        item.attrs = attrsArr;
                        items.push(item);
                    });
                    // console.log(items)
                    return console.log(toXml(items));
                });
            }
        });
    });

}).call(this);
