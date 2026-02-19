require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "http://localhost:5173"],
    methods: ["GET", "POST"]
  }
});

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'CookieMonster',
  resave: false,
  saveUninitialized: false,
  name: 'myCookie',
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true only on HTTPS
    httpOnly: true,
    maxAge: 360000000,
    sameSite: 'lax'
  }
};

// Use session with our app
app.use(session(sessionConfig));

// Built-in body parsing (replaces body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets (legacy client static will be registered only when React build is absent)

// App routes
// require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.use('/api/stripe', require('./server/config/stripe-routes.js'));

// If a React production build exists, serve it from /client-react/dist
const reactDist = path.join(__dirname, 'client-react', 'dist');

if (fs.existsSync(reactDist)) {
  // Serve static assets from the React build
  app.use(express.static(reactDist));
  // Return React's index for any GET that isn't matched by earlier routes (API etc.)
  // Use a regex to avoid path-to-regexp parameter parsing issues ('*' can be invalid in some environments)
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(reactDist, 'index.html'));
  });
} else {
  // Fallback to legacy client during incremental migration
  // Serve legacy client static assets and bower components
  app.use(express.static(path.join(__dirname, 'client')));
  app.use(express.static(path.join(__dirname, 'bower_components')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });
}

// Socket.io handling
// We pass the 'io' instance to our separated logic file
require('./server/socketHandler.js')(io);

// server.listen(3000, () => console.log('Server running on port 3000'));

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server listening on port ${PORT} (env: ${process.env.NODE_ENV || 'development'})`));

// usernames which are currently connected to the c);







//Break in case of sockets!!!!!!!!!!!!!!!!!
// var server = app.listen(8000, function() {
// (legacy) listener helper removed - see modern startup and graceful shutdown handlers below
// });

// Graceful shutdown helpers
const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close((err) => {
    if (err) {
      console.error('Error closing server:', err);
      process.exit(1);
    }
    io.close();
    console.log('Shutdown complete.');
    process.exit(0);
  });
  // Force exit if shutdown takes too long
  setTimeout(() => {
    console.warn('Forcing shutdown after 10s.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  shutdown('unhandledRejection');
});

// Legacy socket samples removed — using modern Socket.IO server API above.
