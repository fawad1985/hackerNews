/**
 * dependencies
 */
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router'


/**
 * templates
 */
import '/imports/client/templates/layouts/blankLayout.js';
import '/imports/client/templates/common/error.js';
import '/imports/client/templates/hackerNews/hackerNews.js';

/* Route Config */

Router.configure({
  layoutTemplate:   'blankLayout',
  notFoundTemplate: 'error'
});



Router.route('/', function() {
  Router.go('hackerNews');
});

Router.route('hackerNews', {
  path : '/hackerNews',
  template: 'hackerNews'
});
