import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const subdomains = new Set(['/lectorum'])

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Subdomain rerouting - Leaving this out for now as SEO treats subdomains as seperate entities
  // See: https://www.seo.com/blog/subdomains-for-seo/
  // const domainComponents = request.headers.get('host')?.split('.')
  // const hostIndex = domainComponents.findIndex((e) => e === request.nextUrl.host)
  // const incomingSubdomain = domainComponents
  //   .slice(0, hostIndex)
  //   .map((subdomain) => `/${subdomain}`)
  //   .join('')
  // if (subdomains.has(incomingSubdomain)) {
  // const rewriteSource = (incomingSubdomain?.length ? incomingSubdomain : '/index') + request.nextUrl.pathname // The incoming request path pattern
  // const rewriteDestination = request.url // The path the rewrite routes to
  // return NextResponse.rewrite(new URL(rewriteSource, rewriteDestination))
  // } else {
  return NextResponse.next()
  // }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '*',
// }
