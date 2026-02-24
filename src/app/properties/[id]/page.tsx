'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
    Building2,
    MapPin,
    TurkishLira,
    ChevronLeft,
    Share2,
    MoreVertical,
    BedDouble,
    Bath,
    Square,
    User
} from 'lucide-react';
import Link from 'next/link';
import { cn, getWhatsAppShareLink, getWhatsAppDirectLink } from '@/lib/utils';
import { getPropertyById } from '@/lib/data';
import { Phone, MessageCircle } from 'lucide-react';

export default function PropertyDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const property = getPropertyById(id);

    // Mock data for functional buttons
    const agentName = "Ahmet Yılmaz";
    const agentPhone = "05321234567";

    if (!property) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Building2 className="w-16 h-16 text-muted-foreground/20" />
                <h2 className="text-2xl font-bold">Portföy bulunamadı</h2>
                <Link href="/properties" className="text-primary font-bold hover:underline flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Portföylere Dön
                </Link>
            </div>
        );
    }

    const handleShare = () => {
        const text = `Merhaba! EmlakCRM üzerinden şu portföye bakmanızı öneririm: ${property.title} - ${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(property.price)}. Detaylı bilgi için: ${window.location.href}`;
        window.open(getWhatsAppShareLink(text), '_blank');
    };

    const handleWhatsApp = () => {
        const text = `Merhaba Ahmet Bey, ${property.title} (İlan No: #${property.id}) hakkında detaylı bilgi alabilir miyim?`;
        window.open(getWhatsAppDirectLink(agentPhone, text), '_blank');
    };

    const handleCall = () => {
        window.location.href = `tel:${agentPhone}`;
    };

    const handleEdit = () => {
        // Placeholder for edit functionality
        alert('Düzenleme sayfası yakında eklenecek!');
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                    <Link href="/properties" className="p-2 hover:bg-accent rounded-full transition-colors border shadow-sm shrink-0">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="min-w-0">
                        <h2 className="text-xl md:text-3xl font-bold tracking-tight truncate">Portföy Detayı</h2>
                        <p className="text-muted-foreground mt-0.5 text-xs md:text-sm">İlan no: #{property.id}</p>
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <button
                        onClick={handleShare}
                        className="flex-1 sm:flex-none p-3 border rounded-xl hover:bg-accent transition-colors flex items-center justify-center"
                        title="Daha fazla paylaş"
                    >
                        <Share2 className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={handleEdit}
                        className="flex-[2] sm:flex-none px-6 py-3 premium-gradient text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm md:text-base"
                    >
                        Düzenle
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden relative shadow-2xl">
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="glass-panel p-8 rounded-3xl space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="min-w-0">
                                <h3 className="text-2xl md:text-3xl font-black mb-2 text-foreground">{property.title}</h3>
                                <p className="flex items-start gap-2 text-muted-foreground text-base md:text-lg">
                                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>{property.address}</span>
                                </p>
                            </div>
                            <div className="text-left sm:text-right w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-border/50">
                                <p className="text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Satış Fiyatı</p>
                                <h4 className="text-2xl md:text-3xl font-black text-primary italic">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(property.price)}
                                </h4>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-y py-8">
                            <div className="flex flex-col items-center gap-2">
                                <BedDouble className="w-6 h-6 text-primary" />
                                <span className="font-bold">{property.bedrooms ? `${property.bedrooms} Oda` : 'N/A'}</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Bath className="w-6 h-6 text-primary" />
                                <span className="font-bold">{property.bathrooms ? `${property.bathrooms} Banyo` : 'N/A'}</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Square className="w-6 h-6 text-primary" />
                                <span className="font-bold">{property.sqft} m²</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-xl">Açıklama</h4>
                            <p className="text-muted-foreground leading-loose">
                                {property.type === 'residential' ? 'Modern yaşamın tüm gereksinimlerini karşılamak üzere tasarlanmıştır.' : 'Stratejik konumu ve profesyonel altyapısı ile iş dünyası için idealdir.'} Geniş pencereleri sayesinde gün boyu doğal ışık alan mülk, birinci sınıf malzeme kalitesi ve ince işçiliği ile öne çıkmaktadır. 24 saat güvenlik, kapalı otopark ve sosyal donatılara sahip bir proje içerisinde yer almaktadır.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-panel p-8 rounded-3xl bg-primary/5 border-primary/10">
                        <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
                            <User className="w-6 h-6" />
                            Emlak Danışmanı
                        </h4>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-slate-300 shadow-lg flex items-center justify-center text-muted-foreground">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h5 className="font-black text-lg">{agentName}</h5>
                                <p className="text-sm text-muted-foreground">Kıdemli Gayrimenkul Danışmanı</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={handleWhatsApp}
                                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-6 h-6" />
                                WhatsApp ile İletişime Geç
                            </button>
                            <button
                                onClick={handleCall}
                                className="w-full py-4 bg-white border-2 border-primary/20 text-primary rounded-2xl font-black hover:bg-white/50 transition-all flex items-center justify-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Şimdi Ara
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
