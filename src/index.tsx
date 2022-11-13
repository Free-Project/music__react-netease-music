import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './pages/App';

import 'normalize.css/normalize.css';
import './styles/global.module.css';
import './components/Message/style.module.css';

const authLink = setContext((_, { headers }) => {
  const session = JSON.parse(localStorage.getItem('__session') || '{}');
  return {
    headers: {
      ...headers,
      'netease-user-id': session.userId,
      'netease-token': session.token,
      'netease-nick-name':
        session.profile?.nickname &&
        encodeURIComponent(session.profile?.nickname),
    },
  };
});

const client = new ApolloClient({
  link: authLink,
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
};

render();

if ((module as any).hot) {
  (module as any).hot.accept(['./pages/App.tsx'], () => render());
}
