import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuToggleProvider } from './context/MenuToggleContext';

import Login from './components/features/authentication/Login';
import AppLayout from './components/ui/AppLayout';
import Home from './components/features/dashboard/Home';
import Prograns from './components/features/programs/Programs';
import Artists from './components/features/artists/Artists';
import Events from './components/features/events/Events';
import Gallery from './components/features/gallery/Gallery';
import Profile from './components/features/profile/Profile';

import Program from './components/features/programs/Program';
import AddPrograms from './components/features/programs/AddPrograms';
import Activity from './components/features/activities/Activity';
import AddActivity from './components/features/activities/AddActivity';
import EditProgram from './components/features/programs/EditProgram';
import Artist from './components/features/artists/Artist';
import AddArtist from './components/features/artists/AddArtist';

function App() {
  return (
    <MenuToggleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/programs" element={<Prograns />} />
            <Route path="/programs/:slug" element={<Program />} />
            <Route path="/programs/:slug/edit" element={<EditProgram />} />
            <Route path="/programs/add" element={<AddPrograms />} />
            <Route path="/activities/:id" element={<Activity />} />
            <Route path="/activities/add" element={<AddActivity />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:slug" element={<Artist />} />
            <Route path="/artists/add" element={<AddArtist />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuToggleProvider>
  );
}

export default App;
