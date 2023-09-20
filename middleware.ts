export { default } from "next-auth/middleware";

// These are the pages that need login first
export const config = { matcher: ["/extra", "/dashboard"] };
