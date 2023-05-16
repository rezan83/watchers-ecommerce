import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from 'store';

interface IProps {
  children: ReactNode;
  rule: 'admin' | 'user' | 'guest';
}
const ProtectFor: FC<IProps> = ({ rule, children }) => {
  const isUser = useAuthStore(state => state.user);
  let evaluate: boolean = false;
  const navigate = useNavigate();
  switch (rule) {
    case 'admin':
      evaluate = isUser?.is_admin || false;
      break;
    case 'user':
      evaluate = isUser ? true : false;
      break;
    case 'guest':
      evaluate = isUser ? false : true;
      break;

    default:
      evaluate = false
      break;
  }

  useEffect(() => {
    if (!evaluate) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluate, rule]);

  return <>{evaluate && <>{children}</>}</>;
};
export default ProtectFor;
