import { renderStylesToString } from 'emotion-server';
import { RequestHandler } from 'express';
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { App } from '../App';
import { Document } from '../Document';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export const renderApp: RequestHandler = async (req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  );

  try {
    const staticContext: StaticRouterContext = {};
    const bootstrap = (
      <StaticRouter context={staticContext} location={req.path}>
        <App />
      </StaticRouter>
    );

    const markup = renderStylesToString(renderToString(bootstrap));
    const helmet = Helmet.renderStatic();

    res
      .status(staticContext.statusCode || 200)
      .send(
        `<!doctype html>${renderToStaticMarkup(
          <Document content={markup} helmet={helmet} js={assets.client.js} />,
        )}`,
      );
  } catch (e) {
    console.log(e);
    next(e);
  }
};
