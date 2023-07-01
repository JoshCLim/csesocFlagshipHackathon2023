import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      id: string;
    };
  }
  //   interface User {
  //     email: string;
  //     name: string;
  //     image: string;
  //     id: string;
  //   }
}
