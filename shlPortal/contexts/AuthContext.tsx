import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useCookie } from '../hooks/useCookie';
import config from '../lib/config';
import { LoginData } from '../pages/api/v1/auth/login';
import { TokenData } from '../pages/api/v1/auth/token';

type Session = {
  token: string;
};

const SessionContext = createContext<{
  session: Session | null;
  loggedIn: boolean;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleRefresh: () => Promise<void>;
  handleLogout: () => void;
}>({
  session: null,
  loggedIn: false,
  isLoading: true,
  setSession: () => { },
  handleLogin: () => Promise.resolve(),
  handleRefresh: () => Promise.resolve(),
  handleLogout: () => { },
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [, setUserID, deleteUserID] = useCookie(config.userIDCookieName);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data: LoginData = await response.json();

        if (data.status === 'error') {
          throw new Error(data.errorMessage);
        }

        setSession({
          token: data.payload.accessToken,
        });

        if (typeof window !== 'undefined') {
          window.localStorage.setItem('refreshToken', data.payload.refreshToken);
        }

        setUserID(data.payload.userid.toString());
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    [setUserID],
  );

  const handleLogout = useCallback(() => {
    if (typeof window === 'undefined') return;
    setSession(null);
    window.localStorage.removeItem('refreshToken');
    deleteUserID();
  }, [deleteUserID]);

  const isRefreshingRef = useRef(false);

  const handleRefresh = useCallback(async () => {
    if (typeof window === 'undefined' || isRefreshingRef.current === true) return;

    isRefreshingRef.current = true;

    try {
      const response = await fetch('/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: window.localStorage.getItem('refreshToken'),
        }),
      });

      if (!response.ok) {
        handleLogout();
        setIsLoading(false);
        isRefreshingRef.current = false;
        return;
      }

      const data: TokenData = await response.json();

      if (data.status === 'logout') {
        handleLogout();
        setIsLoading(false);
        isRefreshingRef.current = false;
        return;
      }

      setSession({
        token: data.payload.accessToken,
      });
      setIsLoading(false);
      isRefreshingRef.current = false;

      window.localStorage.setItem('refreshToken', data.payload.refreshToken);

      setUserID(data.payload.userid.toString());
    } catch (error) {
      console.error('Refresh error:', error);
    }
  }, [handleLogout, setUserID]);

  useEffect(() => {
    if (!session) {
      if (typeof window !== 'undefined' && window.localStorage.getItem('refreshToken')) {
        handleRefresh();
        return;
      }
      setIsLoading(false);
    }
  }, [session, handleRefresh]);

  return (
    <SessionContext.Provider
      value={{
        session,
        loggedIn: !!session,
        isLoading,
        setSession,
        handleLogin,
        handleRefresh,
        handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
