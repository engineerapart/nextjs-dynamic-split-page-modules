# nextjs-dynamic-split-page-modules
An examplar Next.js project that splits the page bundles dynamically

Next.js automatically codesplits on the page boundaries (that is, each page's JS bundle is 
dynamically imported). However, what if we want to further split the bundles so that each page is 100%
independent of the other pages, for example for independent deployments? In such a scenario,
you can use an externally managed manifest to handle the URLs that the bundles are deployed to,
and use dynamic imports as the glue to bring them together in the app.

The purpose of this project is to demonstrate:

1. Splitting the page bundles deeper than just Next's default page splitting.
2. How to handle the `getInitialProps` calls, which need to be available BEFORE the bundle downloads
3. How to handle loading data in `getInitialProps` while simultaneously downloading the page's JS bundle

The pages already live in separate bundles. This is demonstrating how to FURTHER cut the initial page bundle
size by dynamically importing most of the rendering javascript until later, instead importing what is
minimally necessary to execute `getInitialProps`.

The consequence of this loading model is:
1. The initial page view contains the minimal JS bundle required to deliver the page from server
2. The actual page content bundle gets loaded later
3. During SPA navigation, the page content bundle is being downloaded **AT THE SAME TIME** as the `getInitialProps` API requests. The result of this is that the page renders faster: In a stock Next.js app, the entire bundle has to be downloaded & evaluated before `getInitialProps` can be called. That is still true, we've simply significantly cut the initial bundle size required to call `getInitialProps`.
4. Since the page content and `getInitialProps` are downloading at the same time, the page will render faster.

### Custom server
This example includes a custom server just to provide an example API call.

It is not pertinent to the code splitting - the server.js file can be excluded (in which case you would run `next start`)

## Getting started
``` bash
git clone git@github.com:engineerapart/nextjs-dynamic-split-page-modules.git
cd nextjs-dynamic-split-page-modules
yarn && yarn dev
```

Click on the `View Item` link. Observe the page's behavior both in the browser's dev tools as well as in the browswer itself.
