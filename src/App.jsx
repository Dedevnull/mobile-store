import { Header } from './components/Header';
import { CartProvider } from './contexts/CartProvider';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <>
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <CartProvider>
        <Header />
        <div className='min-h-screen xl:px-[15%] pt-25'>
          <AppRoutes />
        </div>
      </CartProvider>
    </div>
  </>
);

export default App;
