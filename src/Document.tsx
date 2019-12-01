import React from 'react';
import { HelmetData } from 'react-helmet';

interface DocumentProps {
  content: string;
  helmet: HelmetData;
  js: string;
}

export function Document({ content, helmet, js }: DocumentProps) {
  return (
    <html lang="en" {...helmet.htmlAttributes.toComponent()}>
      <head>
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
