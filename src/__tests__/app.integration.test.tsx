import React from 'react';
import yakbak from 'yakbak';
import http from 'http';
import App from '../components/App';

import { render } from '@testing-library/react';

describe('App', () => {
  let server: http.Server;

  beforeAll(() => {
    server = http
      .createServer(
        yakbak('https://api-cloud.aboutyou.de', {
          dirname: __dirname + '/tapes',
        }),
      )
      .listen(process.env.PORT || 9459);
  });

  afterAll(done => server.close(done));

  it('should render logo in the header', () => {
    const { queryByText } = render(<App />);
    expect(queryByText('ABOUT YOU')).toBeDefined();
  });

  it('should render products as soon as they are fetched', async () => {
    const { findAllByTestId } = render(<App />);
    expect((await findAllByTestId('ProductTile')).length).toBe(50);
  });
});
