import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  limit: number
  windowMs: number
}

const defaultConfig: RateLimitConfig = {
  limit: 100,
  windowMs: 60 * 1000, // 1 minute
}

// In-memory store for rate limiting
// In production, this should be replaced with Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(request: NextRequest, config: RateLimitConfig = defaultConfig) {
  const ip = request.ip || 'unknown'
  const now = Date.now()
  const resetTime = now + config.windowMs
  
  // Get or create rate limit data for this IP
  let rateLimitData = rateLimitStore.get(ip)
  
  if (!rateLimitData || rateLimitData.resetTime < now) {
    // First request or reset time has passed
    rateLimitData = { count: 1, resetTime }
    rateLimitStore.set(ip, rateLimitData)
    
    return {
      headers: {
        'X-RateLimit-Limit': config.limit.toString(),
        'X-RateLimit-Remaining': (config.limit - 1).toString(),
        'X-RateLimit-Reset': Math.floor(resetTime / 1000).toString(),
      },
      limited: false,
    }
  }
  
  // Increment count
  rateLimitData.count += 1
  rateLimitStore.set(ip, rateLimitData)
  
  // Check if limit exceeded
  if (rateLimitData.count > config.limit) {
    return {
      headers: {
        'X-RateLimit-Limit': config.limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': Math.floor(rateLimitData.resetTime / 1000).toString(),
      },
      limited: true,
    }
  }
  
  return {
    headers: {
      'X-RateLimit-Limit': config.limit.toString(),
      'X-RateLimit-Remaining': (config.limit - rateLimitData.count).toString(),
      'X-RateLimit-Reset': Math.floor(rateLimitData.resetTime / 1000).toString(),
    },
    limited: false,
  }
}

export function applyRateLimit(request: NextRequest, config?: RateLimitConfig) {
  const result = rateLimit(request, config)
  
  if (result.limited) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { 
        status: 429,
        headers: result.headers,
      }
    )
  }
  
  return null
} 