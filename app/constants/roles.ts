export const UserRole = {
  Admin: 'admin',
  User: 'user',
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]

export function isAdminRole(role: string): boolean {
  return role === UserRole.Admin
}
