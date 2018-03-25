var path = require('path');
var config = require('../config/config.js');

var Slack = require(path.resolve(__dirname, '../src/index.js'));
var slack = new Slack();



    slack.alert(
{
    "username": "example",
    "text": "THIS IS A BIG ERROR",
    "resource": "Resource",
    "channel": "monitoring",
    "gossip": "false",
    "attachments": [
    {
        "fallback": "Required plain-text summary of the attachment.",
        "color": "#36a64f",
        "pretext": "Optional text that appears above the attachment block",
        "author_name": "Bobby Tables",
        "author_link": "http://flickr.com/bobby/",
        "author_icon": "http://flickr.com/icons/bobby.jpg",
        "title": "Slack API Documentation",
        "title_link": "https://api.slack.com/",
        "text": "Optional text that appears within the attachment",
        "fields": [
            {
                "title": "Priority",
                "value": "High",
                "short": false
            }
        ],
        "image_url": "http://my-website.com/path/to/image.jpg",
        "thumb_url": "http://example.com/path/to/thumb.png",
        "footer": "Slack API",
        "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
        "ts": 123456789
    }
]
});