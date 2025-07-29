// src/lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind classes intelligently
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}


