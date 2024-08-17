'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from './Loading';
import authService from '@/appwrite/auth';
import { getUserDetail } from '@/store/feature-user';
import { useDispatch } from 'react-redux';
import nookies from 'nookies';

const publicPages = ['/sign-in', '/sign-up'];

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
const dispatch = useDispatch();
const pathname = usePathname();
const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkAuth = async () => {
    try {
      const userData = await authService.getCurrentUser();
      dispatch(getUserDetail(userData));

        // Set cookie with user ID
        if (userData && userData.$id) {
          nookies.set(null, 'userId', userData.$id, { path: '/' });
        }
        
      if (userData && publicPages.includes(pathname)) {
        console.log('userData', userData)
        router.push('/');
      } else if (!userData && !publicPages.includes(pathname)) {
        router.push('/sign-in');
      } else if (userData && publicPages.includes(pathname)) {
        router.push('/');
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      dispatch(getUserDetail({}));
      router.push('/sign-in');
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, [pathname, router, dispatch]);

if (loading) {
  return <Loading />;
}

return <div>{children}</div>;
};

export default ProtectedRoute;