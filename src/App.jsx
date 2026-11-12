import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuToggleProvider } from './context/MenuToggleContext';

import ProtectedRoutes from './components/ui/ProtectedRoutes';
import AppLayout from './components/ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const Login = lazy(() => import('./components/features/authentication/Login'));
const ForgotPassword = lazy(() =>
  import('./components/features/authentication/ForgotPassword')
);
const ResetPassword = lazy(() =>
  import('./components/features/authentication/ResetPassword')
);
const Home = lazy(() => import('./components/features/dashboard/Home'));
const Programs = lazy(() => import('./components/features/programs/Programs'));
const Program = lazy(() => import('./components/features/programs/Program'));
const AddPrograms = lazy(() =>
  import('./components/features/programs/AddPrograms')
);
const EditProgram = lazy(() =>
  import('./components/features/programs/EditProgram')
);
const Activity = lazy(() => import('./components/features/activities/Activity'));
const AddActivity = lazy(() =>
  import('./components/features/activities/AddActivity')
);
const Artists = lazy(() => import('./components/features/artists/Artists'));
const Artist = lazy(() => import('./components/features/artists/Artist'));
const AddArtist = lazy(() => import('./components/features/artists/AddArtist'));
const Events = lazy(() => import('./components/features/events/Events'));
const AddEvents = lazy(() => import('./components/features/events/AddEvents'));
const Event = lazy(() => import('./components/features/events/Event'));
const EditEvent = lazy(() => import('./components/features/events/EditEvent'));
const Gallery = lazy(() => import('./components/features/gallery/Gallery'));
const Exhibition = lazy(() =>
  import('./components/features/gallery/Exhibition')
);
const AddExhibition = lazy(() =>
  import('./components/features/gallery/AddExhibition')
);
const EditExhibition = lazy(() =>
  import('./components/features/gallery/EditExhibition')
);
const Work = lazy(() => import('./components/features/gallery/Work'));
const AddWork = lazy(() => import('./components/features/gallery/AddWork'));
const Profile = lazy(() => import('./components/features/profile/Profile'));
const Users = lazy(() => import('./components/features/users/Users'));
const User = lazy(() => import('./components/features/users/User'));
const AddUser = lazy(() => import('./components/features/users/AddUser'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <MenuToggleProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute component={<Login />} />} />
            <Route
              path="/reset-password"
              element={<PublicRoute component={<ForgotPassword />} />}
            />
            <Route
              path="/auth/reset-password"
              element={<PublicRoute component={<ResetPassword />} />}
            />
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:id" element={<Program />} />
              <Route path="/programs/:id/edit" element={<EditProgram />} />
              <Route path="/programs/add" element={<AddPrograms />} />
              <Route path="/activities/:id" element={<Activity />} />
              <Route path="/activities/add" element={<AddActivity />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<Artist />} />
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
              <Route path="/works/:id" element={<Work />} />

              <Route path="/profile" element={<Profile />} />

              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/users/add" element={<AddUser />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: '14px',
              maxWidth: '500px',
              padding: '14px 22px',
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-black)',
            },
          }}
        />
      </QueryClientProvider>
    </MenuToggleProvider>
  );
}

function PublicRoute({ component }) {
  return <Suspense fallback={<RouteLoader />}>{component}</Suspense>;
}

function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-label="Loading page">
      <span />
    </div>
  );
}

export default App;
