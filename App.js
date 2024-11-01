import Navigation from './Navigation';
import { UserProvider } from './UserContext';

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
