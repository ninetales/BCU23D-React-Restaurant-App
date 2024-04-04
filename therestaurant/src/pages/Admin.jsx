import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';

const Admin = () => {
  const { isAdmin } = useContext(AdminContext);
  if (!isAdmin) return "You don't have permission to view this page";
  return <div>You are Admin</div>;
};

export default Admin;
