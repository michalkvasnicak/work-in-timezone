import { Link, Heading, createComponent } from '@byteclaw/visage';
import React from 'react';
import { Link as RouteLink, RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';

const Image = createComponent('img', {
  defaultStyles: {
    display: 'block',
  },
});

export function NotFound({ staticContext }: RouteComponentProps) {
  if (staticContext) {
    staticContext.statusCode = 404;
  }

  return (
    <>
      <Helmet>
        <title>Not found</title>
      </Helmet>
      <Heading>Not found</Heading>
      <Image
        src="https://media.giphy.com/media/IHOOMIiw5v9VS/giphy.gif"
        alt="Not found gif"
      />
      <Link as={RouteLink} to="/">
        Back to Homepage
      </Link>
    </>
  );
}
