import * as userService from '../services/userService'
import { UserRole } from '../models/User'

export async function getUserById(id: string) {
  return userService.getUserById(id)
}

export async function getUserByEmail(email: string) {
  return userService.getUserByEmail(email)
}

export async function getUserPackages(userId: string) {
  return userService.getUserPackages(userId)
}

export async function updateUserRole(userId: string, role: UserRole) {
  return userService.updateUserRole(userId, role)
}

export async function getStats() {
  return userService.getStats()
} 