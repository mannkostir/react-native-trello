import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '..';

export const useAuthSelector = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const authError = useMemo(() => authState.error, [authState.error]);

  return {
    currentUser: authState.currentUser,
    isAuthLoading: authState.isLoading,
    authError,
  };
};
