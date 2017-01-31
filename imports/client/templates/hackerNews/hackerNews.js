import { Template } from 'meteor/templating';
import { HTTP } from 'meteor/http';
import './hackerNews.html';
import './_post.html';
import '../ui_helpers.js';

Posts = new Mongo.Collection(null);

Template.hackerNews.helpers({
  postCount() {
    return Posts.find().count();
  },
  countDisplay : function(){
    let count = Posts.find().count();
    return (count) ? '' : 'none';
  },
  posts : function(){
    let query       =  { score : { $exists:true } },
        projection  =  { sort : { score:-1 } };
    return Posts.find(query, projection);
  }
});

Template.hackerNews.events({
  'click button'(event, instance) {
    if ( !Posts.find().count() ){
      getHackerNewsItems();
    }else{
      toastr.success(`Easy on the gas buddy, we've already loaded ${Posts.find().count()} posts for you.`);
    }
  }
});


function getHackerNewsItems(){
  HTTP.call("GET", "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", function(err, res){
    if (err){
      console.log(err.reason);
    }
    else{
      let newsIds = res.data;
      if (newsIds.length){
        newsIds.forEach(function(id){
          HTTP.call("GET", `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, function(err,res){
            if (err){
              console.log(err.reason);
            }else{
              return Posts.insert(res.data);
            }
          })
        });
      }
    }

  });
}
