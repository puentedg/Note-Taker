const router = require('express').Router();
const { readFromFile,writeToFile } = require('../helpers/fsUtils');
const {uuid} = require('uuidv4');

// GET Route getting all the notes
router.get('/api/notes', (req, res) => {
    readFromFile('db/db.json','utf8').then((data)=>{
    
      return res.json(JSON.parse(data))
    })
}
);

// POST Route for submitting note
router.post('/api/notes', (req, res) => {
// Destructuring assignment for the items in req.body
readFromFile('db/db.json').then((data)=>{
const db = JSON.parse(data) 
const newNote = req.body;
const id = 'id';
const noteId = uuid();
newNote[id] = noteId;
db.push(newNote);

writeToFile('db/db.json', JSON.stringify(db)).then((data)=>{
  return res.json(data)
})   

}); });
  
  router.delete('/api/notes/:id', (req, res) => {
      const id = req.params.id;
      readFromFile("db/db.json").then((data)=>{
        const db = JSON.parse(data)
        for (let i=0; i < db.length; i++) {
          if (id===db[i].id) {
            db.splice([i],1);
            writeToFile('db/db.json', JSON.stringify(db)).then((data)=>{
              return res.json(data)
            })
          }
        }
      })
  })
  
  module.exports = router;