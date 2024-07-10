import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';


import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './Redux/rootReducer.js';

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
