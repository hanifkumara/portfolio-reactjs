import Router from './config/routes'
import './App.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import store from './config/redux/store'

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <Router />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
