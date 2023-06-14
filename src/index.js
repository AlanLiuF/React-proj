import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css'     /* normalize the default styles of HTML elements across different browsers. */
import './index.css';       /* index.css必须放在normalize.css后面 */
import App from './App';
import { store } from './store';     /* Redux的使用: 引入store.js, ...Slice.js, 以及Provider */
import { Provider } from 'react-redux';


const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store = {store}>    {/* wrap the App, and pass {store} into Provider */}
      <App tab = 'home'/>
    </Provider>
);


