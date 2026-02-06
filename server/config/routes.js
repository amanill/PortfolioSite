

module.exports = function(app){
  // Example API endpoint used by the React sample
  app.get('/api/hello', (req, res) => {
    res.json({ msg: 'Hello from Express backend!' })
  })
}
