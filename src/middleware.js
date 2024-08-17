import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import nookies from 'nookies';
 
export function middleware(request) {
  const allCookies = cookies();
  const appwriteSession = allCookies.get('userId');
  
  console.log('All Cookies:', allCookies);
  console.log('Appwrite Session:', appwriteSession);

  const publicPages = ['/sign-in', '/sign-up'];


  console.log('firstt', request.nextUrl.pathname)
  console.log('firstt5', request.nextUrl)

  if (appwriteSession?.value && publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (appwriteSession === undefined && !publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  } 
  // else if (appwriteSession.value && publicPages.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect('/');
  // }
  
  // Rest of your code here
  
  console.log('middleware');
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/blog', '/edit-notes', '/home', '/my-blogs', '/sign-in', '/sign-up'],
}