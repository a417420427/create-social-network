import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';
import { createApolloClient } from 'utils/apollo-client';
import { StoreProvider } from 'store';

import 'normalize.css';
import theme from 'theme';

import App from 'components/App/App';
import { LanguageProvider } from 'i18n';
console.log(process.env);
// Create a Apollo client
const API_URI = 'http://localhost:4000/graphql'; // process.env.REACT_APP_API_URL;
const apolloClient = createApolloClient(API_URI);

render(
  <ApolloProvider client={apolloClient}>
    <ApolloHooksProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </StoreProvider>
      </ThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
