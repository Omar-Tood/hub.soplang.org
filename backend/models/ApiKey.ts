import { ApiKey } from '@prisma/client'

export type ApiKeyCreateInput = {
  name: string
  userId: string
}

export type ApiKeyWithoutKey = Omit<ApiKey, 'key'> & {
  key?: string
} 