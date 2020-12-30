const express = require('express')
const router = express.Router();

router.route("/")
.get((req, res)=>{
  res.send("Hello from GET")
})
.post((req, res)=>{
  res.send("Hello from POST")
})
.put((req, res)=>{
  res.send('hello from PUT')
})
.delete((req, res)=>{
  res.send("hello from delete")
})

module.exports = router
