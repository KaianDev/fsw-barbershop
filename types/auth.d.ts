/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      todinho: string
    } & DefaultSession["user"]
  }
}
