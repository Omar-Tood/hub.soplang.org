import { Package, PackageDependency } from '@prisma/client'

export type PackageWithDependencies = Package & {
  dependencies: PackageDependency[]
}

export type PackageWithAuthor = Package & {
  author: {
    name: string | null
    image: string | null
  }
}

export type PackageSearchResult = {
  id: string
  name: string
  version: string
  description: string | null
  downloads: number
  authorName: string | null
  authorImage: string | null
  createdAt: Date
  updatedAt: Date
}

export type PackageCreateInput = {
  name: string
  version: string
  description?: string
  keywords?: string[]
  repository?: string
  license?: string
  readme?: string
  sha256: string
  authorId: string
} 