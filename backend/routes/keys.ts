import { NextRequest, NextResponse } from 'next/server'
import { apiKeyController } from '../api'
import { requireAuth } from '../auth/middleware'
import { applyRateLimit } from '../utils/rateLimit'

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  // Require authentication
  const user = await requireAuth(request)
  if (user instanceof NextResponse) return user

  try {
    const apiKeys = await apiKeyController.getUserApiKeys(user.id)
    return NextResponse.json(apiKeys)
  } catch (error) {
    console.error('Error fetching API keys:', error)
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  // Require authentication
  const user = await requireAuth(request)
  if (user instanceof NextResponse) return user

  try {
    const body = await request.json()
    
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    
    const apiKey = await apiKeyController.createApiKey({
      name: body.name,
      userId: user.id,
    })
    
    return NextResponse.json(apiKey, { status: 201 })
  } catch (error) {
    console.error('Error creating API key:', error)
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 })
  }
} 