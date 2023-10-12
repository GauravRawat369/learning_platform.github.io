import React from 'react'
import { Outlet , useNavigate} from 'react-router-dom';
const Privateroutes = (props) => {
    const { authenticated, setAuthenticated } = props;
    const Navigate = useNavigate();
    if (!authenticated) {
        return <Navigate to="/login" />;
      }
    return <Outlet />;
    };
    

export default Privateroutes