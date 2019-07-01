import { Component } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link'

import { getInitialProps } from './data';

// Store a module-level variable indicating if we are on server. This governs behavior
// in getInitialProps.
const isServer = typeof window === 'undefined';
// Set up the loader for our dynamic module.
const ModuleLoader = () => import(/* webpackChunkName: "feature.item" */ './content');

const PageContent = dynamic({
  ssr: true,
  // loading: () => <p>Yay I am a loading screen. You probably don't want this.</p>
  modules: () => {
    return {
      PageModule: ModuleLoader,
    };
  },
  render: (props, { PageModule }) => {
    const PageComponent = PageModule.default;
    return <PageComponent {...props} />;
  },
});

const Page = (props) => {
  return <PageContent {...props} />;
};

Page.getInitialProps = async (ctx) => {
  let loading = false;
  let props = {
    item: {},
  };

  // If we are on client, kick off downloading the page content bundle, and immediately render
  // whatever we have available. 'Loading' indicates our loading state.
  // This is optional. You could just as easily make the full `getInitialProps` call here,
  // in parallel with `ModuleLoader()`.
  if (!isServer) {
    ModuleLoader();
    loading = true;
  } else {
    // If we are on server, render all the content.
    props = await getInitialProps(ctx);
  }

  return { loading, ...props };
};

export default Page;

