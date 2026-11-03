import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Dominio público de la app (sin protocolo), derivado de NEXT_PUBLIC_SITE_URL. */
export const SITE_HOST = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  .replace(/^https?:\/\//, "")
  .replace(/\/+$/, "")
