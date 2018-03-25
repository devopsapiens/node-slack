/**
 * Created by erasmodominguezjimenez on 27/8/17.
 */
var config = {};

/* API Settings */
config.api = {};
config.api.port = 3000;

/*
 Slack WebHook Settings
 */
config.slack = {};
config.slack.username = "Chuck";
config.slack.emoji = "";
config.slack.webhook_url = "SET THIS";
config.slack.eventColor = "good"; // can either be one of good, warning, danger, or any hex color code (eg. #439FE0).

/*
 Slack API Integration
 */
config.slack.token = "SET THIS";
config.slack.createchannelurl = "https://slack.com/api/channels.create";

config.appConfig = [{
    "product": "",
    "channel": "",
    "description": "",
    "dependsOn": ["",
        ""
    ]
}];

module.exports = config;