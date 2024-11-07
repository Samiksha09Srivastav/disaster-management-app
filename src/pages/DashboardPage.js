import React,{useContext} from 'react';
import NavigationBar from '../Components/Header/NavigationBar';
import  AlertSummary from '../Components/Dashboard/AlertSummary';
import ResourceSummary from '../Components/Dashboard/ResourceSummary';
import HelpRequestSummary from '../Components/Dashboard/HelpRequestSummary';
import UserActivity from '../Components/Dashboard/UserActivity';
import { AuthContext } from '../context/AuthContext';
import UserManagement from '../Components/Dashboard/UserManagement';

const DashboardPage = () => {
  const { userRole } = useContext(AuthContext);
  return (
    <div className='flex flex-col'>
      <NavigationBar />
      <div className="dashboard flex flex-wrap gap-4">
      <AlertSummary />
      {userRole === 'admin' && (
        <>
          <ResourceSummary />
          <UserManagement />
          <UserActivity />
        </>
      )}
      {userRole === 'rescuer' && (
        <>
          <ResourceSummary />
          <HelpRequestSummary />
        </>
      )}
      {userRole === 'general' && <HelpRequestSummary />}
    </div>
    </div>
  );
}

export default DashboardPage;
