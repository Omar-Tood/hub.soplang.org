import { User, Package, ApiKey } from '@prisma/client'

export type UserWithPackages = User & {
  packages: Package[]
}

export type UserWithApiKeys = User & {
  apiKeys: ApiKey[]
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER',
  USER = 'USER'
} 