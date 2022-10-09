
import CreateQuote from './components/CreateQuote';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/create',
        element: <CreateQuote />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/profile',
        element: <Profile />
    }
]

export default routes