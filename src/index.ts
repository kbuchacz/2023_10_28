import Server from './services/server.service';

function startServer() {
  const server = new Server();

  console.info('Starting server...');
  server.init();
}

void startServer();
