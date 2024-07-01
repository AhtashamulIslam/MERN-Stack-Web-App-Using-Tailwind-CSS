import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store,persistor } from './redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
//If the page is refreshed then the state from persistgate will hold the state in local storage of web browser.

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
     <App />
    </Provider>
  </PersistGate>
)
