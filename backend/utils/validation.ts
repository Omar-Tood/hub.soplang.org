import { z } from 'zod'
import { isValidVersion } from './semver'

// Package name validation
export const packageNameSchema = z
  .string()
  .min(1, 'Package name is required')
  .max(214, 'Package name cannot exceed 214 characters')
  .regex(
    /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    'Package name must use lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen'
  )

// Package version validation
export const packageVersionSchema = z
  .string()
  .min(1, 'Version is required')
  .refine(isValidVersion, 'Version must follow semantic versioning (e.g., 1.0.0)')

// Package description validation
export const packageDescriptionSchema = z
  .string()
  .max(1000, 'Description cannot exceed 1000 characters')
  .optional()

// Package keywords validation
export const packageKeywordsSchema = z
  .array(z.string().min(1).max(30))
  .max(10, 'Cannot have more than 10 keywords')
  .optional()

// Package license validation
export const packageLicenseSchema = z
  .string()
  .max(100, 'License cannot exceed 100 characters')
  .optional()

// Package repository validation
export const packageRepositorySchema = z
  .string()
  .url('Repository must be a valid URL')
  .max(255, 'Repository URL cannot exceed 255 characters')
  .optional()

// API key name validation
export const apiKeyNameSchema = z
  .string()
  .min(1, 'API key name is required')
  .max(100, 'API key name cannot exceed 100 characters')

// User email validation
export const userEmailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required')

// User password validation
export const userPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password cannot exceed 100 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  )

// Package schema for creation
export const createPackageSchema = z.object({
  name: packageNameSchema,
  version: packageVersionSchema,
  description: packageDescriptionSchema,
  keywords: packageKeywordsSchema,
  license: packageLicenseSchema,
  repository: packageRepositorySchema,
})

// Package schema for updating
export const updatePackageSchema = z.object({
  description: packageDescriptionSchema,
  keywords: packageKeywordsSchema,
  license: packageLicenseSchema,
  repository: packageRepositorySchema,
})

// API key schema for creation
export const createApiKeySchema = z.object({
  name: apiKeyNameSchema,
}) 