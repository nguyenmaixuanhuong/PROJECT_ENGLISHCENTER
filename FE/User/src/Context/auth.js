import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

 
export const useAuthCheckLogin= () => {
  const Navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token'); 
    if (!isLoggedIn) {
      Navigate('/login')
    }
  }, [Navigate]);

  return;
};


export const useAuthCheckStudent = () => {
  const Navigate = useNavigate();
  const role = useSelector((state)=>state.role);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token'); 
    if (!isLoggedIn) {
      Navigate('/login')
    }
    else{
        if(role !== 'Student'){
            Navigate('/login')
        }
    }
  }, [Navigate]);

  return;
};


export const useAuthCheckTeacher= () => {
    const Navigate = useNavigate();
    const role = useSelector((state)=>state.role);
    useEffect(() => {
      const isLoggedIn = localStorage.getItem('token'); 
      if (!isLoggedIn) {
        Navigate('/login')
      }
      else{
        if(role !== 'Teacher'){
            Navigate('/login')
        }
      }
    }, [Navigate]);
  
    return;
};