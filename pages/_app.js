import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Importar PersistGate
import { store, persistor } from '../redux/store';
import 'typeface-roboto';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;