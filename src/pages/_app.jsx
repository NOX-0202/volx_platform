import "../../styles/material-colors-vars.scss";
import "../../styles/global.scss";
import "../../styles/nprogress.css";
import "../../styles/index.css";

const pkg = require("@/root/package.json");

import { useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";

import NProgress from 'nprogress';

router.onRouteChangeStart = () => NProgress.start();
router.onRouteChangeComplete = () => NProgress.done();
router.onRouteChangeError = () => NProgress.done();

export default function MyApp({ Component, pageProps, appProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <meta name="apple-mobile-web-app-capable" content="yes" />

      <title>{pkg.title}</title>
    </Head>
    <Component {...appProps} {...pageProps} />
  </>
}