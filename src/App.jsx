import { Header } from './components/Header';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <>
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header />
      <div className='min-h-screen xl:px-[15%] pt-25'>
        <AppRoutes />
      </div>
    </div>
  </>
);

export default App;
