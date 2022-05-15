import observableSymbol from 'symbol-observable';

import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';


import { Provider } from 'react-redux';
import {store , persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client';

import { BrowserRouter } from 'react-router-dom';

import './index.css'
import App from './App';
import Loading from './components/Loading';

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<Loading/>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>
);


reportWebVitals();