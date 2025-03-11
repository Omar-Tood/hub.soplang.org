import * as apiKeyService from '../services/apiKeyService'
import { ApiKeyCreateInput } from '../models/ApiKey'

export async function getUserApiKeys(userId: string) {
  return apiKeyService.getUserApiKeys(userId)
}

export async function createApiKey(data: ApiKeyCreateInput) {
  return apiKeyService.createApiKey(data)
}

export async function deleteApiKey(id: string, userId: string) {
  return apiKeyService.deleteApiKey(id, userId)
}

export async function validateApiKey(key: string) {
  return apiKeyService.validateApiKey(key)
} 