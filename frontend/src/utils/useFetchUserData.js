import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchUserData = (setUser, navigate) => {
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        navigate('/login');
      } else {
        setUser(userData);
      }
    };
    fetchUserData();
  }, [navigate, setUser]);
};

export default useFetchUserData;
