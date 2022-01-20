import { useContext } from 'react';
import { NEARApiContext } from '../context/nearContext';

export function useNear() {
  const { nearContext, setNearContext } = useContext(NEARApiContext);
  return [nearContext, setNearContext] as const;
}