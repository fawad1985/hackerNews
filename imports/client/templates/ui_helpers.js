import { Template } from 'meteor/templating';
import moment       from 'moment';


Template.registerHelper("formatDate", function(timeStamp){
  let _date = new Date( timeStamp * 1000 );
  return moment(_date).format('llll');
});


Template.registerHelper("eq", function(arg1, arg2){
  return ( arg1 == arg2 );
});
