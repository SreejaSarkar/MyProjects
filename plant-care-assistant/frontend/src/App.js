import './App.css';
import AppContent from './AppContent';
import { AlertProvider } from './context/AlertContext';


function App() {

  return (
    
    <>
    
    <AlertProvider>
      <AppContent/>
    </AlertProvider>
    
    </>
  );
}

export default App;
