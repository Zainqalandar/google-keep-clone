'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const publicPages = ['/sign-in', '/sign-up'];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('cookieFallback') || '[]');
    const isAuthenticated = token && typeof token === 'object' && Object.keys(token).length > 0;

    if (!isAuthenticated && !publicPages.includes(pathname)) {
      router.push('/sign-in');
    } else if (isAuthenticated && publicPages.includes(pathname)) {
      router.push('/');
    } else {
      setLoading(true);
    }
  }, [pathname, router, publicPages]);

  if (!loading) {
    return <Loading />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;