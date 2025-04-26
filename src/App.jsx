import { Header } from './components/Header';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <>
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header />
      <AppRoutes />
    </div>
  </>
);

export default App;
