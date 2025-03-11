import { NextRequest, NextResponse } from 'next/server'
import { packageController } from '../../api'
import { requireAuth, getAuthUser } from '../../auth/middleware'
import { applyRateLimit } from '../../utils/rateLimit'

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  try {
    const pkg = await packageController.getPackageByName(params.name)
    
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }
    
    // Increment download count
    await packageController.incrementDownloads(pkg.id)
    
    return NextResponse.json(pkg)
  } catch (error) {
    console.error('Error fetching package:', error)
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  // Require authentication
  const user = await requireAuth(request)
  if (user instanceof NextResponse) return user

  try {
    // Get package
    const pkg = await packageController.getPackageByName(params.name)
    
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }
    
    // Check if user is the author or admin
    if (pkg.authorId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Parse request body
    const body = await request.json()
    
    // Update package
    const updatedPkg = await packageController.updatePackage(pkg.id, {
      description: body.description,
      repository: body.repository,
      license: body.license,
      keywords: body.keywords,
      readme: body.readme,
    })
    
    return NextResponse.json(updatedPkg)
  } catch (error) {
    console.error('Error updating package:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  // Require authentication
  const user = await requireAuth(request)
  if (user instanceof NextResponse) return user

  try {
    // Get package
    const pkg = await packageController.getPackageByName(params.name)
    
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }
    
    // Check if user is the author or admin
    if (pkg.authorId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Delete package
    await packageController.deletePackage(pkg.id)
    
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 })
  }
} 