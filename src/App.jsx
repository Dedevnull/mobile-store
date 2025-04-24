import { Header } from './components/Header'
import AppRoutes from './routes/Routes'

function App() {

  return (
    <>
      <div className='min-h-screen flex flex-col bg-gray-50'>
        <Header />
        <AppRoutes />
      </div>
    </>
  )
}

export default App
