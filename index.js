var socks5Agent = require('socks5-http-client/lib/Agent');
var request = require('request');
var cheerio = require('cheerio');

var alfred2 = require('node-alfred2');

function btdiggSearch(val) {
    request({
        url: 'http://btdigg.org/search?info_hash=&q=' + val,
        // request by http proxy
        // proxy: '',
        // request by socks5
        agent: new socks5Agent({
            socksHost: '127.0.0.1',
            socksPort: 1080
        })
    }, function(err, res) {
        var feedback = new alfred2.Feedback();
        if (!err) {
            var $ = cheerio.load(res.body);
            var container = $('#search_res').children('table').children('tr');

            container.each(function() {
                var name = $('.torrent_name', this).first().text();
                var link = $('.torrent_name_tbl .ttth a', this).first().attr('href');
                var tr = $('.torrent_name_tbl', this).eq(1).children('tr').first();
                var item = {
                    children: {
                        title: name,
                        icon: 'icon.png'
                    },
                    attrs: {
                        uid: 'btdigg',
                        arg: link
                    }
                };

                var attrsArr = [];
                $('td', tr).each(function(idx, el) {
                    if (idx > 1 && idx < 5) {
                        var attr = $('.attr_name', el).text() + $('.attr_val', el).text();
                        attrsArr.push(attr);
                    }
                });
                item.children.subtitle = attrsArr.join(', ');
                feedback.addItem(item);
            });
        }
        // console.log(items)
        return feedback.output();
    });
}

function main() {
    if (process.argv.length < 2) {
        return;
    }

    var val = process.argv[2];
    val = val.replace(/\\\s/gi, '+');

    btdiggSearch(val);
};

main();
