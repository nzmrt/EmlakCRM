'use client';

import React, { useState } from 'react';
import {
    Mail,
    Phone,
    Tag,
    Home,
    Save,
    ChevronLeft,
    Calendar,
    User,
    MapPin
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NewLeadPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        // Redirect or show success
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/leads" className="p-2 hover:bg-accent rounded-full transition-colors border shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Yeni Müşteri Kaydı</h2>
                        <p className="text-muted-foreground mt-1">Sisteminize yeni bir potansiyel alıcı veya kiracı ekleyin.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Client Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-8 rounded-2xl space-y-6">
                        <h3 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            İletişim Bilgileri
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-foreground/80">Ad Soyad</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input type="text" placeholder="Müşteri adını girin" className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-foreground/80">E-posta</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input type="email" placeholder="example@mail.com" className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-foreground/80">Telefon</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input type="tel" placeholder="+90 5XX XXX XXXX" className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-foreground/80">Bilgi Kaynağı</label>
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    <select className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer font-medium">
                                        <option>Sahibinden.com</option>
                                        <option>Hepsiemlak</option>
                                        <option>Emlakjet</option>
                                        <option>Web Sitesi</option>
                                        <option>Gelen Çağrı</option>
                                        <option>Tavsiye</option>
                                        <option>Referans</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 rounded-2xl space-y-6">
                        <h3 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
                            <Home className="w-5 h-5 text-primary" />
                            Talep Detayları
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-foreground/80">İlgilendiği Bölge</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input type="text" placeholder="Örn: Bebek, Nişantaşı" className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-foreground/80">Bütçe Aralığı (Milyon TL)</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" placeholder="Min" className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                                    <span className="text-muted-foreground font-bold">-</span>
                                    <input type="number" placeholder="Max" className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1 text-foreground/80">Notlar</label>
                            <textarea rows={4} placeholder="Müşterinin özel istekleri, görüşme notları..." className="w-full p-4 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-6">
                    <div className="glass-panel p-8 rounded-2xl space-y-6">
                        <h3 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Durum
                        </h3>
                        <div className="space-y-3">
                            {['new', 'contacted', 'qualified'].map((status) => (
                                <label key={status} className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer group">
                                    <input type="radio" name="status" defaultChecked={status === 'new'} className="w-4 h-4 accent-primary" />
                                    <span className="text-sm font-bold capitalize">
                                        {status === 'new' ? 'Yeni Kayıt' : status === 'contacted' ? 'İletişime Geçildi' : 'Nitelikli Aday'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full py-4 premium-gradient text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-70 disabled:scale-100"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span>Kaydediliyor...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-6 h-6" />
                                    <span>Müşteriyi Kaydet</span>
                                </>
                            )}
                        </button>
                        <Link href="/leads" className="w-full block text-center py-4 glass-panel rounded-2xl font-bold text-muted-foreground hover:bg-rose-50 hover:text-rose-600 transition-all">
                            İptal Et
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Loader2({ className }: { className?: string }) {
    return (
        <svg
            className={cn("animate-spin", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}
