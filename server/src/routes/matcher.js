import {
  borrowBook,
  returnBook,
} from "#root/modules/borrow/borrow.controller.js";
import {
  getAllBooks,
  getFullBorrows,
} from "#root/modules/book/book.controller.js";
import { getDashBoarddata } from "#root/modules/user/user.controller.js";
import { login } from "#root/modules/auth/auth.controller.js";

const routes = [
  {
    method: "GET",
    path: "api/loadDashboard/",
    handler: getDashBoarddata,
    isProtected: true,
  },
  {
    method: "GET",
    path: "api/allbooks/",
    handler: getAllBooks,
    isProtected: false,
  },{
    method: "GET",
    path: "api/borrowCatalogue/",
    handler: getFullBorrows,
    isProtected: true,
  },
  {
    method: "POST",
    path: "api/borrow/:bookid/",
    handler: borrowBook,
    isProtected: true,
  },
  {
    method: "POST",
    path: "api/returnbook/:borrowid/",
    handler: returnBook,
    isProtected: true,
  },
  {
    method: "POST",
    path: "api/login/",
    handler: login,
    isProtected: false,
  },
];
export function matchRoute(req) {
  const host = req.headers.host || "localhost";
  const parsedUrl = new URL(req.url, `http://${host}`);

  const method = req.method;
  const pathName = parsedUrl.pathname;
  const urlParts = pathName.split("/").filter(Boolean);

  for (const route of routes) {
    if (route.method !== method) continue;
    const routeParts = route.path.split("/").filter(Boolean);
    if (routeParts.length !== urlParts.length) continue;
    let params = {};
    let isMatch = true;

    for (let i = 0; i < routeParts.length; i++) {
      const r = routeParts[i];
      const u = urlParts[i];
      if (r.startsWith(":")) {
        params[r.slice(1)] = decodeURIComponent(u);
      } else {
        if (r !== u) {
          isMatch = false;
          break;
        }
      }
    }

    if (isMatch) {
      return { route, params };
    }
  }
  return null;
}
