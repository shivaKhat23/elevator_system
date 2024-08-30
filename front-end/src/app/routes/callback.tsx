import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/config/redux/hook';
import { handleOAuthCallback } from '@/features/login/auth-slice';

export const Callback = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      dispatch(handleOAuthCallback(location.search)).then(() =>
        navigate('/app/elevator', { replace: true }),
      );
    };

    fetchToken();
  }, [location.search, dispatch, navigate]);

  return <div>Loading...</div>;
};
