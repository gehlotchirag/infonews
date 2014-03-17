
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
        var newid= new ObjectId();
        var collection = db.get('newsreader');
        collection.update({ _id:GetId}, {$push:{'highlight': {number: newid, 'text': text} }},{upsert:true,safe:false}, function(err, result) {
            res.send(newid);
//            res.send((result === 1) ? { msg: 'done' } : { msg:'error: ' + err });  
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
        collection.update({ "_id": ObjectId(GetId) , 'highlight.number': ObjectId(HighId) }, {$set:{'highlight.$.comment': text} },{upsert:true,safe:false}, function(err, result) {
            res.send((result === 1) ? { msg: 'done' } : { msg:'error: ' + err+ HighId +GetId+result+text});  
        });
    };
};

exports.findcom = function(db) {
    return function(req, res) {
        var GetId = req.params.id;
        var HighId = req.params.hid;
        var text = req.params.txt;
        var ObjectId = require('mongodb').ObjectID;
        var collection = db.get('newsreader');
        
        
        collection.findOne({ "highlight.number": ObjectId(HighId) }, function(err, result) {
        
        
//        collection.aggregate([{$unwind:"$highlight"},{$match:{"_id":ObjectId(GetId),"highlight.number":ObjectId(HighId)}},{$project:{"highlight":1}}], function(err, result) {
            if (err) {
                console.log('Error updating rating: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(result);
            }
            
        });
    
        // collection.find({ "_id": ObjectId(GetId) , 'highlight.number': ObjectId(HighId) }, {$set:{'highlight.$.comment': text} },{upsert:true,safe:false}, function(err, result) {
//             res.send((result === 1) ? { msg: 'done' } : { msg:'error: ' + err+ HighId +GetId+result+text});  
//         });
    };
};

/*
exports.addcom = function(db) {
    return function(req, res) {
        var GetId = req.params.id;
        var HighId = req.params.hid;
        var text = req.params.txt;
        var ObjectId = require('mongodb').ObjectID;
        var collection = db.get('newsreader');
        collection.update({ _id:HighId}, {$set:{'highcomment': {number: new ObjectId(HighId), 'text': text} }},{upsert:true,safe:false}, function(err, result) {
            res.send((result === 1) ? { msg: 'done' } : { msg:'error: ' + err+ HighId +GetId+result+text});  
        });
    };
};
*/

