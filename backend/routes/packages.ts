import { NextRequest, NextResponse } from 'next/server'
import { packageController } from '../api'
import { requireAuth, getAuthUser } from '../auth/middleware'
import { applyRateLimit } from '../utils/rateLimit'

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  // Parse query parameters
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const sort = url.searchParams.get('sort') || 'downloads'

  try {
    const result = await packageController.getAllPackages(page, limit, sort)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
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
    const formData = await request.formData()
    
    // Get package file
    const packageFile = formData.get('package') as File
    if (!packageFile) {
      return NextResponse.json({ error: 'Package file is required' }, { status: 400 })
    }
    
    // Read package file as buffer
    const packageBuffer = Buffer.from(await packageFile.arrayBuffer())
    
    // Get package metadata
    const name = formData.get('name') as string
    const version = formData.get('version') as string
    const description = formData.get('description') as string
    const license = formData.get('license') as string
    const repository = formData.get('repository') as string
    const keywords = formData.get('keywords') as string
    const readme = formData.get('readme') as string
    
    if (!name || !version) {
      return NextResponse.json({ error: 'Name and version are required' }, { status: 400 })
    }
    
    // Create package
    const pkg = await packageController.createPackage(
      {
        name,
        version,
        description,
        license,
        repository,
        keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        readme,
        authorId: user.id,
      },
      packageBuffer
    )
    
    return NextResponse.json(pkg, { status: 201 })
  } catch (error) {
    console.error('Error creating package:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
  }
} 