import * as semver from 'semver'

/**
 * Validates if a version string follows semantic versioning
 */
export function isValidVersion(version: string): boolean {
  return semver.valid(version) !== null
}

/**
 * Checks if a version satisfies a version range
 */
export function satisfiesRange(version: string, range: string): boolean {
  return semver.satisfies(version, range)
}

/**
 * Compares two versions and returns:
 * - 1 if version1 is greater than version2
 * - 0 if they are equal
 * - -1 if version1 is less than version2
 */
export function compareVersions(version1: string, version2: string): number {
  return semver.compare(version1, version2)
}

/**
 * Returns the major version number
 */
export function getMajorVersion(version: string): number {
  const parsed = semver.parse(version)
  return parsed ? parsed.major : 0
}

/**
 * Returns the minor version number
 */
export function getMinorVersion(version: string): number {
  const parsed = semver.parse(version)
  return parsed ? parsed.minor : 0
}

/**
 * Returns the patch version number
 */
export function getPatchVersion(version: string): number {
  const parsed = semver.parse(version)
  return parsed ? parsed.patch : 0
}

/**
 * Increments the major version and resets minor and patch to 0
 */
export function incrementMajor(version: string): string | null {
  return semver.inc(version, 'major')
}

/**
 * Increments the minor version and resets patch to 0
 */
export function incrementMinor(version: string): string | null {
  return semver.inc(version, 'minor')
}

/**
 * Increments the patch version
 */
export function incrementPatch(version: string): string | null {
  return semver.inc(version, 'patch')
} 