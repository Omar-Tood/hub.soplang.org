import * as packageService from '../services/packageService'
import { PackageCreateInput } from '../models/Package'
import crypto from 'crypto'

export async function getAllPackages(page: number, limit: number, sort: string) {
  return packageService.getAllPackages(page, limit, sort)
}

export async function getPackageByName(name: string) {
  return packageService.getPackageByName(name)
}

export async function getPackageVersions(packageName: string) {
  return packageService.getPackageVersions(packageName)
}

export async function searchPackages(query: string, page: number, limit: number) {
  return packageService.searchPackages(query, page, limit)
}

export async function createPackage(data: Omit<PackageCreateInput, 'sha256'>, packageBuffer: Buffer) {
  // Generate SHA-256 hash for the package
  const sha256 = crypto.createHash('sha256').update(packageBuffer).digest('hex')
  
  // Check if package with same name and version already exists
  const existingPackage = await packageService.getPackageByName(data.name)
  if (existingPackage && existingPackage.version === data.version) {
    throw new Error('Package with this name and version already exists')
  }
  
  // Create the package
  return packageService.createPackage({
    ...data,
    sha256,
  })
}

export async function updatePackage(id: string, data: Partial<PackageCreateInput>) {
  return packageService.updatePackage(id, data)
}

export async function deletePackage(id: string) {
  return packageService.deletePackage(id)
}

export async function incrementDownloads(id: string) {
  return packageService.incrementDownloads(id)
}

export async function getNewPackages() {
  return packageService.getNewPackages()
}

export async function getMostDownloadedPackages() {
  return packageService.getMostDownloadedPackages()
}

export async function getRecentlyUpdatedPackages() {
  return packageService.getRecentlyUpdatedPackages()
} 