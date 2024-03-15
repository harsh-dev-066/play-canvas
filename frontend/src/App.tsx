import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { DefaultTheme } from 'styled-components';
import { ReactNode, Suspense, lazy, useEffect } from 'react';
import { getCookie } from './utils/cookieHelper';
import ReportLoader from './components/loaders/ReportLoader';
import Spinner from './components/loaders/Spinner';
import Navbar from './components/Navbar';
import ServerLoader from './components/loaders/ServerLoader';
import { checkServer } from './redux/auth/authSlice';
import Nav from './components/Nav';
import { useAppDispatch } from './app/hooks';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateReport = lazy(() => import('./pages/report/create'));
const ReportDetails = lazy(() => import('./pages/report/details'));

function App() {
  // Global theme name space for dashboard styles
  const theme: DefaultTheme = {
    colors: {
      backgroundColor: 'white',
      primaryTextColor: 'black',
      secondaryTextColor: 'lightgrey',
    },
  };

  interface ProtectRouteProps {
    isAllowed?: boolean;
    redirectPath: string;
    children?: ReactNode;
    isCommon?: boolean;
  }

  const ProtectRoute = ({
    isAllowed,
    redirectPath,
    children,
    isCommon = true,
  }: ProtectRouteProps) => {
    const dispatch = useAppDispatch();
    const { checkServerLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      dispatch(checkServer());
    }, [dispatch]);

    if (checkServerLoading) {
      return <ServerLoader />;
    } else {
      const isAuthTokenValid = isAllowed
        ? true
        : isCommon
        ? !!getCookie('token')
        : !getCookie('token');

      return isAuthTokenValid ? (
        <>{children ? children : <Outlet />}</>
      ) : (
        <Navigate to={redirectPath} replace />
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Spinner />}>
        <GlobalStyles />
        <ReportLoader />
        <Spinner />
        <Router>
          <div className="App">
            {getCookie('token') ? <Navbar /> : <Nav />}
            <Routes>
              {/* <Route path="*" element={<Navigate to={"/login"} replace />} /> */}
              <Route
                path="/"
                element={
                  <ProtectRoute isCommon={true} redirectPath="/login">
                    <Dashboard />
                  </ProtectRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectRoute isCommon={false} redirectPath="/">
                    <Login />
                  </ProtectRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectRoute isCommon={false} redirectPath="/">
                    <Register />
                  </ProtectRoute>
                }
              />

              <Route
                path="/report/create"
                element={
                  <ProtectRoute isCommon={true} redirectPath="/">
                    <CreateReport />
                  </ProtectRoute>
                }
              />
              <Route
                path="/report/details/:id"
                element={
                  <ProtectRoute isCommon={true} redirectPath="/">
                    <ReportDetails />
                  </ProtectRoute>
                }
              />
            </Routes>
          </div>
        </Router>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          toastStyle={{
            color: theme.colors.primaryTextColor,
            backgroundColor: theme.colors.backgroundColor,
          }}
        />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
