import { AdminContext } from '../contexts/AdminContext';
import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

const ToggleAdmin = () => {
  const { isAdmin, toggleAdmin } = useContext(AdminContext);
  return (
    <FontAwesomeIcon
      icon={isAdmin ? faToggleOn : faToggleOff}
      onClick={toggleAdmin}
    />
  );
};

export default ToggleAdmin;
