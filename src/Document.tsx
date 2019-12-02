import React from 'react';
import { HelmetData } from 'react-helmet';

interface DocumentProps {
  content: string;
  helmet: HelmetData;
  js: string;
}

const ANALYTICS_TRACKING_ID = process.env.RAZZLE_ANALYTICS_TRACKING_ID || '';
const gtag = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${ANALYTICS_TRACKING_ID}');
`;

export function Document({ content, helmet, js }: DocumentProps) {
  return (
    <html lang="en" {...helmet.htmlAttributes.toComponent()}>
      <head>
        {ANALYTICS_TRACKING_ID ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_TRACKING_ID}`}
            />
            <script dangerouslySetInnerHTML={{ __html: gtag }} />
          </>
        ) : null}
        <meta charSet="UTF-8" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="HandheldFriendly" content="true" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <script
          src={js}
          defer
          crossOrigin={(process.env.NODE_ENV !== 'production').toString()}
        />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      </body>
    </html>
  );
}
