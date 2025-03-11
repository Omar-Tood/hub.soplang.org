import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/app/lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 