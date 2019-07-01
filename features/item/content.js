import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import { getInitialProps } from './data';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

// This example also includes how to indicate if the incoming page is loading its data.
// This MAY or may not be something you want to do for incoming SPA navigations (you wouldn't
// get the loading=true state in a hard refresh in this example, the page renders on server;
// you only get it in SPA navigation).
// Doing something like that depends heavily on the performance characteristics of your app.

// This component contains the meat of your page content. The `index.js` file exists only
// to serve as the loader for the page, and provide access to `getInitialProps` for Next.js
const PageContent = (props) => {
  const [state, setState] = useState(props);

  // Here, if we are doing SPA nav, we have already rendered the page, we are just downloading its
  // data now instead of having waited for getInitialProps to complete before rendering anything.
  // In my testing, this is resulting in notably faster page renders.
  const getData = async () => {
    if (state.loading) {
      console.log('Loading:');
      const data = await getInitialProps({});
      console.log('Loading got data:', data);;
      setState((tstate) => ({ ...tstate, loading: false, ...data }));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('content rendering:', state);

  return (
    <div className='item'>
      {state.loading ? (
        <div>I'm loading, please wait</div>
      ) : (
          <>
            <div>
              <Link href='/'>
                <a>Back Home</a>
              </Link>
            </div>
            <Title>{state.item.title}</Title>
            <h2>
              {state.item.subtitle} - {state.item.seller}
            </h2>
          </>
        )}
    </div>
  );
};

// We use default exports because it's easier to use dynamic imports that way.
export default PageContent;
