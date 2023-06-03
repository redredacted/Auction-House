import React from 'react';

import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';

type User = {
  name: string;
};

export const Layout: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <>
      <header>
        <Header
          user={user}
          onLogin={() => setUser({ name: 'Jane Doe' })}
          onLogout={() => setUser(undefined)}
          onCreateAccount={() => setUser({ name: 'Jane Doe' })}
        />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
