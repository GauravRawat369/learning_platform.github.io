import React from 'react'
import { Outlet , useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
const Privateroutes = (props) => {
    const { authenticated, setAuthenticated } = props;
    const navigate = useNavigate();
    if (!authenticated ) {
      return navigate('/login');
    }
    return <Outlet />;
    };
    

export default Privateroutes