// pages/_app.js
import { Provider } from 'react-redux'; // Certifique-se de que esta importação está correta
import store from '../redux/store'; // Importe o store que você criou
import 'typeface-roboto';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
