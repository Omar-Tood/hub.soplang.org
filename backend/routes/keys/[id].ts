import { NextRequest, NextResponse } from 'next/server'
import { apiKeyController } from '../../api'
import { requireAuth } from '../../auth/middleware'
import { applyRateLimit } from '../../utils/rateLimit'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  // Require authentication
  const user = await requireAuth(request)
  if (user instanceof NextResponse) return user

  try {
    await apiKeyController.deleteApiKey(params.id, user.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting API key:', error)
    return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 })
  }
} 