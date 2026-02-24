'use client';

import React, { useState } from 'react';
import {
    BadgeDollarSign,
    CheckCircle2,
    Clock,
    Download,
    MessageSquare,
    Plus,
    Search,
    TrendingUp,
    ArrowUpRight,
    FileText,
    Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { cn, getWhatsAppShareLink } from '@/lib/utils';
import { OFFERS } from '@/lib/data';
import { Offer } from '@/types';

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    sent: {
        label: 'Gönderildi',
        color: 'bg-blue-100 text-blue-700',
        icon: <MessageSquare className="w-4 h-4" />,
    },
    draft: {
        label: 'Taslak',
        color: 'bg-amber-100 text-amber-700',
        icon: <Clock className="w-4 h-4" />,
    },
    accepted: {
        label: 'Kabul Edildi',
        color: 'bg-emerald-100 text-emerald-700',
        icon: <CheckCircle2 className="w-4 h-4" />,
    },
    rejected: {
        label: 'Reddedildi',
        color: 'bg-rose-100 text-rose-700',
        icon: <FileText className="w-4 h-4" />,
    },
};

const statsBase = [
    { label: 'Toplam Teklif', value: '5', sub: 'Bu ay', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Gönderilen', value: '3', sub: '3 müşteri', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Kabul Edilen', value: '1', sub: '₺18.2M değer', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Dönüşüm Oranı', value: '%33', sub: 'Sektör ort. %21', color: 'text-violet-600', bg: 'bg-violet-50' },
];

export default function OffersPage() {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [offers, setOffers] = useState<Offer[]>(OFFERS);

    const filtered = offers.filter((o: Offer) => {
        const matchesSearch =
            o.client.toLowerCase().includes(search.toLowerCase()) ||
            o.property.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDeleteOffer = (id: string) => {
        if (window.confirm('Bu teklifi silmek istediğinize emin misiniz?')) {
            setOffers(offers.filter(o => o.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
                        <BadgeDollarSign className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                        Teklifler
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">Hazırlanan ve paylaşılan tüm teklifleri görüntüleyin.</p>
                </div>
                <Link
                    href="/offers/new"
                    className="premium-gradient text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-fit text-sm md:text-base"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Teklif Hazırla
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsBase.map((s) => (
                    <div key={s.label} className="glass-panel p-5 rounded-2xl">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
                        <p className={cn('text-2xl md:text-3xl font-black', s.color)}>{s.value}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground mt-1 line-clamp-1">{s.sub}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Müşteri, portföy veya belge no ara..."
                        className="w-full pl-9 pr-4 py-3 rounded-xl border bg-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm md:text-base"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                    {['all', 'sent', 'draft', 'accepted', 'rejected'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={cn(
                                'px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap',
                                filterStatus === s
                                    ? 'bg-primary text-white border-primary shadow-md'
                                    : 'border-border hover:bg-accent'
                            )}
                        >
                            {s === 'all' ? 'Tümü' : statusConfig[s as keyof typeof statusConfig]?.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Offers List */}
            <div className="glass-panel rounded-2xl divide-y divide-border/50 overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="py-16 text-center text-muted-foreground">
                        <BadgeDollarSign className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p className="font-medium">Teklif bulunamadı.</p>
                    </div>
                ) : (
                    filtered.map((offer: Offer) => {
                        const stKey = offer.status as keyof typeof statusConfig;
                        const st = statusConfig[stKey];
                        return (
                            <div
                                key={offer.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-accent/30 transition-colors group"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Status dot */}
                                    <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', st.color)}>
                                        {st.icon}
                                    </div>

                                    {/* Main info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="font-bold text-sm truncate">{offer.property}</p>
                                            <span className={cn('shrink-0 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest', st.color)}>
                                                {st.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <Link href={`/leads/${offer.leadId}`} className="font-semibold hover:text-primary transition-colors">
                                                {offer.client}
                                            </Link>
                                            <span className="hidden sm:inline">•</span>
                                            <span>{offer.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 mt-2 sm:mt-0">
                                    <p className="font-black text-sm md:text-base text-foreground sm:min-w-[100px] text-right">
                                        {offer.price}
                                    </p>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href="/offers/new"
                                            className="p-2 rounded-lg border hover:bg-background transition-colors"
                                            title="PDF İndir"
                                        >
                                            <Download className="w-4 h-4 text-muted-foreground" />
                                        </Link>

                                        {offer.status !== 'draft' && (
                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        getWhatsAppShareLink(
                                                            `Merhaba ${offer.client}, ${offer.property} için hazırladığım teklifi yeniden iletiyorum. Belge No: ${offer.id}`
                                                        ),
                                                        '_blank'
                                                    )
                                                }
                                                className="p-2 rounded-lg border hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                                                title="WhatsApp ile Gönder"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                            </button>
                                        )}

                                        {offer.status === 'draft' && (
                                            <Link
                                                href="/offers/new"
                                                className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                                            >
                                                <ArrowUpRight className="w-3 h-3" />
                                                <span className="hidden xs:inline">Tamamla</span>
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => handleDeleteOffer(offer.id)}
                                            className="p-2 rounded-lg border hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                                            title="Teklifi Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Summary footer */}
            <p className="text-center text-xs text-muted-foreground">
                {filtered.length} teklif gösteriliyor
                {filterStatus !== 'all' && ` · ${statusConfig[filterStatus]?.label} filtresi aktif`}
            </p>
        </div>
    );
}
