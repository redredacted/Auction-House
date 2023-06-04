import React, { useMemo } from 'react';

import { Navigation, User } from '../Navigation/Navigation';
import { Outlet, useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

export const Layout: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const navigate = useNavigate();
  let session = useSessionContext();

  // TODO: Refactor user state to be some global thing that can be mocked and used with storybook
  useMemo(() => {
    if (session.loading) {
      return;
    }

    let { accessTokenPayload } = session;
    setUser({
      name: accessTokenPayload.userName,
      email: accessTokenPayload.email,
    });
  }, [session]);

  return (
    <>
      <Navigation
        user={user}
        onLogin={() => {navigate('/auth')}}
        onLogout={() => {
          signOut().then(() => {
            setUser(undefined);
            navigate('/');
          });
        }} 
        onCreateAccount={() => {navigate('/auth')}}
        onProfiles={() => {}}
        onSettings={() => {}} />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"><Outlet /></div>
      </main>
    </>
  );
};
