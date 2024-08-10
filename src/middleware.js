import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
 
export function middleware(request) {
  // const appwriteSession = cookies().get('a_session_66a5b843002db497ee34');
  // console.log('cookipe:', appwriteSession);
  
  // Rest of your code here
  
  console.log('middleware');
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}