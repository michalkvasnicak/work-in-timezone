import express from 'express';
import { resolve } from 'path';
import { renderApp } from './routes';

const server = express();
const staticDir =
  process.env.NODE_ENV === 'production'
    ? resolve(__dirname, './public')
    : process.env.RAZZLE_PUBLIC_DIR;

server
  .disable('x-powered-by')
  .disable('etag')
  .use(
    express.static(staticDir, {
      etag: false,
      immutable: true,
      maxAge: '30days',
    }),
  );

server.get('/*', renderApp);

export default server;
