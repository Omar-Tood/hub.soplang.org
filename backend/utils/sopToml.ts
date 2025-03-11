import * as toml from 'toml'

interface SopTomlPackage {
  name: string
  version: string
  description?: string
  license?: string
  author?: string
}

interface SopTomlDependencies {
  [key: string]: string
}

interface SopToml {
  package: SopTomlPackage
  dependencies?: SopTomlDependencies
}

export function parseSopToml(content: string): SopToml {
  try {
    const parsed = toml.parse(content)
    
    // Validate required fields
    if (!parsed.package) {
      throw new Error('Missing [package] section')
    }
    
    if (!parsed.package.name) {
      throw new Error('Missing package.name field')
    }
    
    if (!parsed.package.version) {
      throw new Error('Missing package.version field')
    }
    
    // Validate package name format
    const nameRegex = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if (!nameRegex.test(parsed.package.name)) {
      throw new Error('Invalid package name format. Names must use lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.')
    }
    
    // Validate version format (semver)
    const versionRegex = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/
    if (!versionRegex.test(parsed.package.version)) {
      throw new Error('Invalid version format. Must follow semantic versioning (e.g., 1.0.0).')
    }
    
    return parsed as SopToml
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error parsing sop.toml: ${error.message}`)
    }
    throw new Error('Unknown error parsing sop.toml')
  }
}

export function validateSopToml(toml: SopToml): void {
  // Additional validation beyond the basic parsing
  if (toml.dependencies) {
    for (const [depName, depVersion] of Object.entries(toml.dependencies)) {
      // Check dependency name format
      const nameRegex = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      if (!nameRegex.test(depName)) {
        throw new Error(`Invalid dependency name format: ${depName}`)
      }
      
      // Check version requirement format
      // Allow semver ranges like ^1.0.0, ~1.0.0, >=1.0.0, etc.
      const versionRegex = /^(\^|~|>=|<=|>|<|=)?\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/
      if (!versionRegex.test(depVersion)) {
        throw new Error(`Invalid dependency version format for ${depName}: ${depVersion}`)
      }
    }
  }
}

export function extractDependencies(toml: SopToml): { name: string; versionRange: string }[] {
  if (!toml.dependencies) {
    return []
  }
  
  return Object.entries(toml.dependencies).map(([name, versionRange]) => ({
    name,
    versionRange,
  }))
} 