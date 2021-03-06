var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/admin";
const dbName = "accidentprojet";
const assert = require('assert');

(function main() {
    console.info('populating db with department and region data...');
    var obj = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
    createCollection(obj);
    console.info('Insert commentary and managers informations...');
    createCollectionCommentary();
    CollectionManager();
}());

function CollectionManager() {
    MongoClient.connect(url)
        .then(c => {
            // Connexion ok
            cl = c;
            const db = cl.db(dbName);
            return db;
        })
        .then(db => {
            const collection = db.collection('managers');
            return collection;
        })
        .then(collection => {
            const result = collection.insertMany([{"username" : "Manager", "password" : "pass"}, 
            {"username" : "Ahmed", "password" : "pass"}]);
            console.log('Manager inserted successfully.');
            return result;  // a promised insertion result
        })
        .then(() => {
            cl.close();
        })
        .catch(err => {
            console.error('Whoopsie - something gotcha...');
            console.error(err);
        });
}


function createCollectionCommentary() {
    MongoClient.connect(url)
        .then(c => {
            // Connexion ok
            client2 = c;
            const db = client.db(dbName);
            return db;
        })
        .then(db => {
            const collection = db.collection('commentary');
            return collection;
        })
        .then(collection => {
            const result = collection.insertMany([{"text" : "Accident terrible", "accidentId" : "201600012687", "auteur" : "Matthieu"}, 
            {"text" : "Attention passage de cerfs", "accidentId" : "201600012689", "auteur" : "Matthieu"}, 
            {"text" : "Verre sur chaussée", "accidentId" : "201600012692", "auteur" : "Matthieu"}]);
            console.log('Commentary inserted successfully.');
            return result;  // a promised insertion result
        })
        .then(() => {
            client2.close();
        })
        .catch(err => {
            console.error('Whoopsie - something gotcha...');
            console.error(err);
        });
}

function createCollection(json) {
    MongoClient.connect(url)
        .then(c => {
            // Connexion ok
            client = c;
            const db = client.db(dbName);
            return db;
        })
        .then(db => {
            // db resolved, drop the collection from db
            //db.dropCollection('accidents');
            return db;
        }, err => {
            console.log(" " + err);
        })
        .then(db => {
            const collection = db.collection('accidents');
            return collection;
        })
        .then(collection => {
            console.log(json);
            const result = collection.insertMany(json);
            console.log('Donnees inserees');
            return result;  // a promised insertion result
        })
        .then(() => {
            client.close();
        })
        .catch(err => {
            console.error('Whoopsie - something gotcha...');
            console.error(err);
        });
}

function findDocuments() {
    MongoClient.connect(url)
        .then(c => {
            // Connexion ok
            client = c;
            console.log('Connected successfully to server', url);
            const db = client.db(dbName);
            return db;
        })
        .then(db => {
            // db resolved, drop the collection from db
            //db.dropCollection('accidents');
            return db;
        }, err => {
            console.log(" " + err);
        })
        .then(db => {
            // collection drop resolved, create new collection
            const collection = db.collection('accidents');
            collexion = collection;
            const docs = collexion.find({}).toArray();
            return collexion;
        })
        .then(() => {
            // resolved finding documents, find some filtered documents
            var docs = collexion.find({ 'a': 3 }).toArray();
            return docs;
        })
        .then(docs => {
            // resolved finding documents, print them
            // assert.equal(err, null);
            console.log('Found the following records');
            console.log(docs);
            client.close();
        });
}
//{"data" : {"Adresse": "value","lat:"value,}}