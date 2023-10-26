import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuToggleProvider } from './context/MenuToggleContext';

import Login from './components/features/authentication/Login';
import AppLayout from './components/ui/AppLayout';
import Home from './components/features/dashboard/Home';
import Prograns from './components/features/programs/Programs';
import Artists from './components/features/artists/Artists';
import Events from './components/features/events/Events';

function App() {
  return (
    <MenuToggleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/programs" element={<Prograns />} />
            <Route path="/artist" element={<Artists />} />
            <Route path="/events" element={<Events />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuToggleProvider>
  );
}

export default App;
