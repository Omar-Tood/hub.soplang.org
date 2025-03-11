import { NextRequest, NextResponse } from 'next/server'
import { packageController } from '../../api'
import { applyRateLimit } from '../../utils/rateLimit'

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  // Parse query parameters
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '10')

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
  }

  try {
    const result = await packageController.searchPackages(query, page, limit)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error searching packages:', error)
    return NextResponse.json({ error: 'Failed to search packages' }, { status: 500 })
  }
} 