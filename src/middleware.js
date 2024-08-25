import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
 
export function middleware(request) {
  const allCookies = cookies();
  const appwriteSession = allCookies.get('userId');
  
  console.log('All Cookies:', allCookies);
  console.log('Appwrite Session:', appwriteSession);

  const publicPages = ['/sign-in', '/sign-up'];


  if (appwriteSession?.value && publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (appwriteSession === undefined && !publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  } 


}

export const config = {
  matcher: ['/', '/blog', '/edit-notes', '/home', '/my-blogs', '/sign-in', '/sign-up', '/archive', '/bin', '/edit/:path*']
}