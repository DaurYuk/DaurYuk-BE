function exitRoutine(app) {
  return function(signal) {
    console.log(`${signal} received, cleaning works..`);
    // Stop the server to serve requests
    app.stop();
    // Gracefully exit server process with success code (code 0)
    process.exit(0);
  }
}

module.exports = exitRoutine;