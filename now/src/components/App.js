import { BrowserRouter } from 'react-router-dom';
import UserProvider from '../contexts/userContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;
