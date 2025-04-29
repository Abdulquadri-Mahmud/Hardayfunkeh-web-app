import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../node_modules/tailwindcss/index.css';
import './index.css';
import App from './App.jsx';

import { Provider as ReduxProvider } from 'react-redux';
import { Provider } from './components/ui/provider'; // Rename your Chakra wrapper
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/index.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider>
          <App />
        </Provider>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
