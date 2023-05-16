import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from 'store';

interface IProps {
  children: ReactNode;
  rule: 'admin' | 'user' | 'guest';
}
const ProtectFor: FC<IProps> = ({ rule, children }) => {
  const isUser = useAuthStore(state => state.user);
  let allowed: boolean = false;
  const navigate = useNavigate();
  switch (rule) {
    case 'admin':
      allowed = isUser?.is_admin || false;
      break;
    case 'user':
      allowed = isUser ? true : false;
      break;
    case 'guest':
      allowed = isUser ? false : true;
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
  }, [allowed, rule]);

  return <>{allowed && <>{children}</>}</>;
};
export default ProtectFor;
