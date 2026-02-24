import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getWhatsAppShareLink(text: string) {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppDirectLink(phone: string, text?: string) {
    const cleanPhone = phone.replace(/\D/g, '');
    const base = `https://wa.me/${cleanPhone}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
