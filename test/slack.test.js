process.env.NODE_ENV = 'test';
"use strict";
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var Slack = require('../src/index.js');

var config = require('../config/config.js');
var testChannel = "testing";

describe('slack module', function() {

    var slack = new Slack();


    describe('slack alert default Channel', function() {
        var message = {
            text: 'THIS IS THE FIRST TEST..!'
        };

        it('should alert into #default Config Channel', function(done) {

            slack.alert(message, function(err, body) {
                console.log('body' + JSON.stringify(body));
                should.not.exist(err);
                assert.equal(testChannel, "testing");
                done();
            });
        });

        it('should alert into default Channel With Attachements Data', function(done) {
            var attachmentsTemplate = [{
                "fallback": "Required plain-text summary of the attachment.",
                "color": "#36a64f",
                "pretext": "Optional text that appears above the attachment block",
                "author_name": "Bobby Tables",
                "author_link": "http://flickr.com/bobby/",
                "author_icon": "http://flickr.com/icons/bobby.jpg",
                "title": "Slack API Documentation",
                "title_link": "https://api.slack.com/",
                "text": "Optional text that appears within the attachment",
                "fields": [{
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }],
                "image_url": "http://my-website.com/path/to/image.jpg",
                "thumb_url": "http://example.com/path/to/thumb.png",
                "footer": "Slack API",
                "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
                "ts": 123456789
            }]

            message = {
                text: 'THIS I!',
                channel: config.slack.defaultchannel,
                username: 'testing',
                icon_emoji: 'aida',
                link_names: 1,
                attachments: attachmentsTemplate
            };

            slack.alert(message, function(err, body) {
                console.log('body' + JSON.stringify(body));
                should.not.exist(err);
                done();
            });
        });

        it('should alert into default channel Gossip Mode ON ', function(done) {
            message = {
                text: ' sUNfasdfasd fadfadsf!',
                username: '',
                icon_emoji: '',
                link_names: 1,
                product: 'csql01',
                gossip: 'true',
                origin: 'alarm',
                user: ''
            };

            slack.alert(message, function(err, body) {
                console.log('body' + JSON.stringify(body));
                should.not.exist(err);
                done();
            });
        });
    });


    describe('slack alert', function() {
        var message = {
            text: 'Text!'
        };

        it('should alert into testing Slack Channel', function(done) {

            slack.alert(message, function(err, body) {
                should.not.exist(err);
                assert.equal(testChannel, "testing");
                done();
            });
        });

        it('should alert into #testing Slack Channel With Attachements Data', function(done) {
            var attachmentsTemplate = [{
                "fallback": "Required plain-text summary of the attachment.",
                "color": "#36a64f",
                "pretext": "Optional text that appears above the attachment block",
                "author_name": "Bobby Tables",
                "author_link": "http://flickr.com/bobby/",
                "author_icon": "http://flickr.com/icons/bobby.jpg",
                "title": "Slack API Documentation",
                "title_link": "https://api.slack.com/",
                "text": "Optional text that appears within the attachment",
                "fields": [{
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }],
                "image_url": "http://my-website.com/path/to/image.jpg",
                "thumb_url": "http://example.com/path/to/thumb.png",
                "footer": "Slack API",
                "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
                "ts": 123456789
            }]

            message = {
                text: 'Attachements!',
                channel: "testing,azure-test,azure-monitoring",
                username: 'testing',
                icon_emoji: '',
                link_names: 1,
                attachments: attachmentsTemplate
            };

            slack.alert(message, function(err, body) {
                console.log('body' + JSON.stringify(body));
                should.not.exist(err);
                done();
            });
        });

        it('should alert into default channel', function(done) {
            message = {
                text: ' sUNfasdfasd fadfadsf!',
                username: 'ERASMO',
                icon_emoji: '',
                channel: 'testing',
                link_names: 1,
                product: 'csql01',
                gossip: 'false',
                origin: 'alarma ',
                user: 'edominguez'
            };

            slack.alert(message, function(err, body) {
                console.log('body' + JSON.stringify(body));
                should.not.exist(err);
                done();
            });
        });
    });
});