import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import * as apiKeyController from '../controllers/apiKeyController'

export async function getAuthUser(request: NextRequest) {
  // Check for session authentication
  const session = await getServerSession(authOptions)
  if (session?.user) {
    return {
      id: session.user.id,
      role: session.user.role,
      email: session.user.email,
    }
  }

  // Check for API key authentication
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const apiKey = authHeader.substring(7)
    const keyData = await apiKeyController.validateApiKey(apiKey)
    
    if (keyData) {
      return {
        id: keyData.user.id,
        role: keyData.user.role,
        apiKeyId: keyData.id,
      }
    }
  }

  return null
}

export async function requireAuth(request: NextRequest) {
  const user = await getAuthUser(request)
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return user
}

export async function requireAdmin(request: NextRequest) {
  const user = await getAuthUser(request)
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  if (user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  return user
} 