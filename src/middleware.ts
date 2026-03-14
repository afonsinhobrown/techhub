import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Credenciais do admin (em produção, usar variáveis de ambiente e hash)
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "techhub2026";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rotas admin
  if (pathname.startsWith("/admin") && !pathname.includes("/admin-login")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="TechHub Admin"',
        },
      });
    }

    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    const [user, pass] = auth;

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      return NextResponse.next();
    }

    return new NextResponse(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="TechHub Admin"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
