import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from 'store/authStore';

interface IProps {
  children: ReactNode;
  rule: 'admin' | 'user' | 'guest';
}
const ProtectFor: FC<IProps> = ({ rule, children }) => {
  const isAuthUser = useAuthStore(state => state.authUser);
  let allowed: boolean = false;
  const navigate = useNavigate();
  switch (rule) {
    case 'admin':
      allowed = isAuthUser?.is_admin || false;
      break;
    case 'user':
      allowed = isAuthUser ? true : false;
      break;
    case 'guest':
      allowed = isAuthUser ? false : true;
      break;

    default:
      allowed = false;
      break;
  }

  useEffect(() => {
    if (!allowed) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthUser, rule]);

  return <>{allowed && <>{children}</>}</>;
};
export default ProtectFor;
