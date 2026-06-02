import { UserRole } from '#constants/roles'
import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
  role: vine.enum([UserRole.Admin, UserRole.User]).optional(),
  point_of_sale_id: vine.number().withoutDecimals().positive().optional(),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

export const createUserValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email(),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
  role: vine.enum([UserRole.Admin, UserRole.User]),
  point_of_sale_id: vine.number().withoutDecimals().positive(),
})

export const updateUserValidator = vine.create({
  fullName: vine.string().nullable().optional(),
  email: email().optional(),
  password: password().optional(),
  passwordConfirmation: password().sameAs('password').optional(),
  role: vine.enum([UserRole.Admin, UserRole.User]).optional(),
  point_of_sale_id: vine.number().withoutDecimals().positive().optional(),
})
