import * as packageService from '../services/packageService'
import { PackageCreateInput } from '../models/Package'
import { createHash } from 'crypto'

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
  return packageService.searchPackages({
    query,
    skip: (page - 1) * limit,
    limit,
  })
}

export async function createPackage(data: Omit<PackageCreateInput, 'sha256'>, packageBuffer: Buffer) {
  const sha256 = createHash('sha256').update(packageBuffer).digest('hex')
  return packageService.createPackage({ ...data, sha256 })
}

export async function getPackageById(id: string) {
  return packageService.getPackageById(id)
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