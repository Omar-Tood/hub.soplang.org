import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/app/lib/prisma'
import { AuthOptions } from 'next-auth'

// Define custom session and user types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }
  interface User {
    id: string
    role?: string
    username?: string
    githubId?: string
    avatarUrl?: string
    bio?: string
    company?: string
    location?: string
    website?: string
  }
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return session
    },
    async signIn({ user, account, profile }: any) {
      if (account?.provider === 'github') {
        const githubUser = profile as any
        user.username = githubUser.login
        user.githubId = githubUser.id
        user.avatarUrl = githubUser.avatar_url
        user.bio = githubUser.bio
        user.company = githubUser.company
        user.location = githubUser.location
        user.website = githubUser.blog
      }
      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export default authOptions 