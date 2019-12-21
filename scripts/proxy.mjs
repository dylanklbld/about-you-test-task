#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();
const app = express();

proxy.on('error', function(err) {
  console.error(err);
});

app.use(
  cors({
    origin: true,
    credentials: true,
    maxAge: 1000 * 60 * 5,
  }),
);

app.use((req, res) => {
  proxy.web(req, res, {
    target: 'https://api-cloud.aboutyou.de',
    secure: false,
    changeOrigin: true,
  });
});

const server = app.listen(process.env.PORT || 9459);

const close = () => {
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', close);
process.on('SIGTERM', close);
