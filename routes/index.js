
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};
exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('newsreader');
        collection.find({},{},function(e,docs){
            console.log(docs)
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.getUser = function(db) {
    return function(req, res) {
        var collection = db.get('newsreader');
        collection.find({},{},function(e,docs){
            console.log(docs)
            res.send(docs);
        });
    };
};


exports.del = function(db) {
    return function(req, res) {
        var userToDelete = req.params.id;
        var text = req.params.txt;
        var collection = db.get('newsreader');
        collection.update({ _id:userToDelete}, {$push: {'comments': {"content":text}}}, function(err, result) {
            res.send((result === 1) ? { msg: 'done' } : { msg:'error: ' + err });  
        });
    };
};


exports.high = function(db) {
    return function(req, res) {
        var GetId = req.params.id;
        var text = req.params.txt;
        var ObjectId = require('mongodb').ObjectID;
        var collection = db.get('newsreader');
        collection.update({ _id:GetId}, {$push:{'highlight': {_id: new ObjectId(), 'text': text} }},{upsert:true,safe:false}, function(err, result) {
            res.send((result === 1) ? { msg: 'done' } : { msg:'error: ' + err });  
        });
    };
};

exports.adcom = function(db) {
    return function(req, res) {
        var GetId = req.params.id;
        var HighId = req.params.hid;
        var text = req.params.txt;
        var ObjectId = require('mongodb').ObjectID;
        var collection = db.get('newsreader');
        collection.update({ _id:GetId , highlight._id:HighId }, {$push:{'highlight': {'comment': text} }},{upsert:true,safe:false}, function(err, result) {
            res.send((result === 1) ? { msg: 'done' } : { msg:'error: ' + err });  
        });
    };
};


