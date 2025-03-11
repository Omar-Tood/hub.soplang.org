import { NextRequest, NextResponse } from 'next/server'
import { userController } from '../api'
import { applyRateLimit } from '../utils/rateLimit'

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const stats = await userController.getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
} 