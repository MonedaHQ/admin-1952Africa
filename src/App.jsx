import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuToggleProvider } from './context/MenuToggleContext';

import Login from './components/features/authentication/Login';
import ProtectedRoutes from './components/ui/ProtectedRoutes';
import AppLayout from './components/ui/AppLayout';
import Home from './components/features/dashboard/Home';
import Programs from './components/features/programs/Programs';
import Artists from './components/features/artists/Artists';
import Events from './components/features/events/Events';
import Gallery from './components/features/gallery/Gallery';
import Profile from './components/features/profile/Profile';

import Program from './components/features/programs/Program';
import AddPrograms from './components/features/programs/AddPrograms';
import EditProgram from './components/features/programs/EditProgram';

import Activity from './components/features/activities/Activity';
import AddActivity from './components/features/activities/AddActivity';

import Artist from './components/features/artists/Artist';
import AddArtist from './components/features/artists/AddArtist';

import AddEvents from './components/features/events/AddEvents';
import Event from './components/features/events/Event';
import EditEvent from './components/features/events/EditEvent';

import Exhibition from './components/features/gallery/Exhibition';
import Work from './components/features/gallery/Work';
import AddExhibition from './components/features/gallery/AddExhibition';
import EditExhibition from './components/features/gallery/EditExhibition';
import AddWork from './components/features/gallery/AddWork';

import Users from './components/features/users/Users';
import User from './components/features/users/User';
import AddUser from './components/features/users/AddUser';

function App() {
  return (
    <MenuToggleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<Program />} />
            <Route path="/programs/:slug/edit" element={<EditProgram />} />
            <Route path="/programs/add" element={<AddPrograms />} />
            <Route path="/activities/:id" element={<Activity />} />
            <Route path="/activities/add" element={<AddActivity />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:slug" element={<Artist />} />
            <Route path="/artists/add" element={<AddArtist />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/add" element={<AddEvents />} />
            <Route path="/events/:id" element={<Event />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/add" element={<AddExhibition />} />
            <Route path="/gallery/:id" element={<Exhibition />} />
            <Route path="/gallery/:id/edit" element={<EditExhibition />} />
            <Route path="/works/add" element={<AddWork />} />
            <Route path="/works/:slug" element={<Work />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users/add" element={<AddUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuToggleProvider>
  );
}

export default App;
