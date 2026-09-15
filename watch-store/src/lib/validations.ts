import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address is required"),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address is required"),
  postalCode: z.string().min(2, "Postal code is required"),
  notes: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  brandId: z.string().min(1, "Brand is required"),
  categoryId: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(10, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  salePrice: z.coerce.number().min(0).optional().or(z.literal(0)),
  stock: z.coerce.number().int().min(0),
  gender: z.enum(["MEN", "WOMEN", "UNISEX"]),
  movement: z.string().optional(),
  caseMaterial: z.string().optional(),
  caseDiameter: z.string().optional(),
  dial: z.string().optional(),
  crystal: z.string().optional(),
  waterResistance: z.string().optional(),
  strap: z.string().optional(),
  warranty: z.string().optional(),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  newArrival: z.boolean().default(false),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
});

export const brandSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  logo: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
});

export const couponSchema = z.object({
  code: z.string().min(2, "Code is required"),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  value: z.coerce.number().min(0),
  minimumAmount: z.coerce.number().min(0).optional(),
  maximumUses: z.coerce.number().int().min(0).optional(),
  expiresAt: z.coerce.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().min(2, "Title is required"),
  comment: z.string().min(10, "Comment is required"),
});

export const blogPostSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content is required"),
  featuredImage: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.coerce.date().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});
