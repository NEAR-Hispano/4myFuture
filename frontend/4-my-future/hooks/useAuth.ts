import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export function useAuth() {
  const { authContext, setAuthContext } = useContext(AuthContext);
  return [authContext, setAuthContext] as const;
}