/* eslint-disable import/no-mutable-exports, import/no-unresolved, global-require */
import http from 'http';
import { SERVER_PORT } from './config';

let app = require('./server').default;

let currentApp = app;

const server = http.createServer(app);
const port = SERVER_PORT;

server
  .listen(port, () => {
    console.log(`🚀 started at http://localhost:${port}`);
  })
  .on('error', error => {
    console.log(error);
  });

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}

export default server;
