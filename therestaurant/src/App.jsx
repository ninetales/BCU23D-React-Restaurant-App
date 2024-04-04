import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import './assets/styles/style.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
