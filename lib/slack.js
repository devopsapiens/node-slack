"use strict";
var config  = require('../config/config.js'),
    request = require('request'),
          _ = require('lodash'),
    channelsAlert;

function Slack(hook_url) {
    this.hook_url = hook_url;
}
function Slack(){
    this.hook_url = config.slack.webhook_url;
}

Slack.prototype.alert = function(message,callback) {

    if (!validMessage ) { return false; }

    addAlertChannels(message);

    var requestTemplate = {
        url: this.hook_url,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: ""
    };

    if ( _.isArray(channelsAlert)
        && channelsAlert.length >0) {

        var count   = 0,
            total   = channelsAlert.length,
            body,
            requests = [];

        channelsAlert.forEach(function(channel){

            body = buildRequestBody(message);
            body.channel = channel;
            requestTemplate.body = JSON.stringify(body);

            requests.push(request.post(requestTemplate,function(err, resp, body) {
                count++;
                if ((callback != null) && count === total) {
                    if (body === 'ok') {
                        return callback(null, body);
                    } else {
                        return callback(err || body);
                    }
                }
            }));
        });
        return requests;
    }
};

var validMessage = function () {
    return ((!_.isUndefined(message))
        && ((_.isString(message) && !_.isEmpty(message))
        || (_.isObject(message) && !_.isEmpty(message.text)) )
    );
};

var buildRequestBody = function(message) {

    var body,
        text = "",
        targetProduct = "",
        origin = "",
        username,
        icon_url,
        icon_emoji,
        attachments,
        unfurl_links,
        link_names = 1;

    if(! message || _.isUndefined(message)) return;

    if( _.isString(message)){
        body = {
            text : message
        };
    }
    if(_.isObject(message)){
        if ( message.text    )                        { text = message.text; }
        if ( message.product && !targetProduct )      { text = text + "\n Product  : " + message.product; }
        if ( message.origin && !origin )              { text = text + "\n This Alert was created By : " + message.origin; }
        if ( message.username && !username )          { username = message.username; }
        if ( message.icon_url && !icon_url )          { icon_url = message.icon_url; }
        if ( message.icon_emoji && !icon_emoji )      { icon_emoji = ":" + message.icon_emoji + ":"; }
        if ( message.attachments && !attachments )    { attachments = message.attachments; }
        if ( message.unfurl_links && !unfurl_links )  { unfurl_links = message.unfurl_links; }
        if ( message.link_names && !link_names )      { link_names = message.link_names; }

        body = {
                "text": text,
                "channel": "",
                "username": username,
                "icon_url": icon_url,
                "icon_emoji": icon_emoji,
                "attachments": attachments,
                "unfurl_links": unfurl_links
        };

        if ( message.additionalParams ){ additionalParams(message.additionalParams,body); }
    }
    return body;
};

var additionalParams = function (params,body) {

    if ( params.text )                               { body.text = body.text + "\n " + params.text; }
    if ( params.product )                           { body.text = body.text + "\n Product : " + params.product; }
    if ( params.origin )                             { body.text = body.text + "\n This Alert Was created by : " + params.origin; }
    if ( params.username && !body.username )         { body.username = params.username; }
    if ( params.icon_url && !body.icon_url )         { body.icon_url = params.icon_url; }
    if ( params.icon_emoji && !body.icon_emoji )     { body.icon_emoji = ":" + params.icon_emoji + ":"; }
    if ( params.attachments && !body.attachments )   { body.attachments = params.attachments; }
    if ( params.unfurl_links && !body.unfurl_links ) { body.unfurl_links = params.unfurl_links; }
    if ( params.link_names && !body.link_names )     { body.link_names = params.link_names; }
}

var addAlertChannels = function (message) {

    if ( _.isUndefined(message)) return;

    if ( !channelsAlert ) { channelsAlert = new Array(); }

    if(message.channel){
        var messageChannels = message.channel.split(',');
        channelsAlert= _.union(messageChannels,channelsAlert);
    }

    if(message.additionalParams
        && message.additionalParams.channel){
        var additionalChannels = message.additionalParams.channel.split(',');
        channelsAlert= _.union(additionalChannels,channelsAlert);
    }

    if(message.gossip
        && message.gossip === "true"){
        addGossipChannels(message.product);
    }
}

var addGossipChannels = function (product){
    var channels = new Array();
    config.appConfig.forEach(function (resource) {
        if( resource.dependsOn.indexOf(product) >= 0 ){
            channels.push(resource.channel);
        }
    });
    channelsAlert= _.union(channels,channelsAlert);
}
module.exports = Slack;