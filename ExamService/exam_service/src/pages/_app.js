import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import Container from '@mui/material/Container';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => <MainLayout><Container>{page}</Container></MainLayout>);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {
          getLayout(<>
            <Component {...pageProps} />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover />
          </>)

        }
      </PersistGate>
    </Provider>
  )
}
