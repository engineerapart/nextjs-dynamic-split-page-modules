// Normally you'd have this in your polyfills file but for brevity
import fetch from 'isomorphic-unfetch'

async function getInitialProps(ctx) {
  const { req, query } = ctx;

  const isServer = !!req
  let results = {};

  if (isServer) {
    // When being rendered server-side, we have access to our data in query that we put there in routes/item.js,
    // saving us an http call. Note that if we were to try to require('../operations/get-item') here,
    // it would result in a webpack error.
    results = { item: query.itemData }
  } else {
    // On the client, we should fetch the data remotely
    const res = await fetch('/_data/item', {
      headers: { Accept: 'application/json' }
    })
    const json = await res.json()
    results = { item: json }
  }

  return results
}

export { getInitialProps };
