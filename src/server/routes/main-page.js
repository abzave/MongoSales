import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../components/App';

const router = express.Router();

router.get('/', (request, response) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  response.send(`
    <html>
      <head>
        <title>Ventas</title>
      </head>
      <body>
        <div id="mountnode">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

module.exports = router;