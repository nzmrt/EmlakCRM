'use client';

import React, { useState } from 'react';
import {
    Mail,
    Phone,
    MessageSquare,
    History,
    ChevronLeft,
    Edit,
    BadgeCheck,
    Tag,
    FileText,
    Plus,
    X,
    Send,
    BadgeDollarSign,
    CheckCircle2,
    Clock,
    Download,
    ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { cn, getWhatsAppDirectLink, getWhatsAppShareLink } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { getLeadById, OFFERS } from '@/lib/data';
import { Offer } from '@/types';

export default function LeadDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const lead = getLeadById(id);

    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [interactions, setInteractions] = useState([
        { id: 1, type: 'offer', description: 'Teklif gönderildi: Lüks 3+1 Daire - Beşiktaş (#OFF-26-1042)', date: '2026-02-24 10:15' },
        { id: 2, type: 'call', description: 'Görüşüldü, portföy paylaşıldı.', date: '2024-02-23 11:00' },
        { id: 3, type: 'message', description: 'WhatsApp üzerinden katalog gönderildi.', date: '2024-02-22 14:30' },
        { id: 4, type: 'status_change', description: 'Potansiyelden Nitelikli adaya yükseltildi.', date: '2024-02-21 09:15' },
    ]);

    if (!lead) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <BadgeCheck className="w-16 h-16 text-muted-foreground/20" />
                <h2 className="text-2xl font-bold">Müşteri bulunamadı</h2>
                <Link href="/leads" className="text-primary font-bold hover:underline flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Müşterilere Dön
                </Link>
            </div>
        );
    }

    const leadOffers = OFFERS.filter(o => o.leadId === id);

    const handleCall = () => {
        window.location.href = `tel:${lead.phone}`;
    };

    const handleEmail = () => {
        window.location.href = `mailto:${lead.email}`;
    };

    const handleEdit = () => {
        alert('Düzenleme formu yakında eklenecek!');
    };

    const handleAddNote = () => {
        if (!noteText.trim()) return;
        const newNote = {
            id: Date.now(),
            type: 'note',
            description: noteText.trim(),
            date: new Date().toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        };
        setInteractions([newNote, ...interactions]);
        setNoteText('');
        setIsNoteOpen(false);
    };

    const interactionTypeLabels: Record<string, string> = {
        call: 'Arama',
        message: 'Mesaj',
        status_change: 'Durum',
        note: 'Not',
        offer: 'Teklif',
    };

    const interactionTypeColors: Record<string, string> = {
        call: 'bg-blue-100 text-blue-700',
        message: 'bg-emerald-100 text-emerald-700',
        status_change: 'bg-violet-100 text-violet-700',
        note: 'bg-amber-100 text-amber-700',
        offer: 'bg-rose-100 text-rose-700',
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/leads" className="p-2 hover:bg-accent rounded-full transition-colors border shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center text-white font-black text-2xl shadow-xl">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-3xl font-bold tracking-tight">{lead.name}</h2>
                                <BadgeCheck className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                                <span className={cn(
                                    "px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    lead.status === 'won' ? 'bg-emerald-100 text-emerald-700' :
                                        lead.status === 'lost' ? 'bg-rose-100 text-rose-700' :
                                            'bg-blue-100 text-blue-700'
                                )}>
                                    {lead.status === 'new' ? 'Yeni' :
                                        lead.status === 'contacted' ? 'Görüşüldü' :
                                            lead.status === 'qualified' ? 'Nitelikli' :
                                                lead.status === 'lost' ? 'Kaybedildi' : 'Kazanıldı'}
                                </span>
                                <span className="text-muted-foreground text-sm font-medium italic">Kayıt: {new Date(lead.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleEdit}
                        className="p-3 border rounded-xl hover:bg-accent transition-colors"
                        title="Düzenle"
                    >
                        <Edit className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button
                        onClick={handleCall}
                        className="p-3 border rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                        title="Ara"
                    >
                        <Phone className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleEmail}
                        className="p-3 border rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                        title="E-posta Gönder"
                    >
                        <Mail className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => window.open(getWhatsAppDirectLink(lead.phone, `Merhaba ${lead.name}, sizinle ilgilendiğiniz mülkler hakkında görüşmek isterim.`), '_blank')}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <MessageSquare className="w-5 h-5" />
                        WhatsApp Gönder
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-6">
                        <h3 className="font-bold text-lg border-b pb-3">Profil Detayları</h3>
                        <div className="space-y-4">
                            <button
                                onClick={handleEmail}
                                className="flex items-center gap-4 w-full group hover:bg-accent/50 p-2 rounded-xl transition-colors text-left"
                            >
                                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">E-posta</p>
                                    <p className="font-semibold group-hover:text-primary transition-colors">{lead.email}</p>
                                </div>
                            </button>
                            <button
                                onClick={handleCall}
                                className="flex items-center gap-4 w-full group hover:bg-accent/50 p-2 rounded-xl transition-colors text-left"
                            >
                                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Telefon</p>
                                    <p className="font-semibold group-hover:text-primary transition-colors">{lead.phone}</p>
                                </div>
                            </button>
                            <div className="flex items-center gap-4 p-2">
                                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Kaynak</p>
                                    <p className="font-semibold">{lead.source}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl space-y-6">
                        <h3 className="font-bold text-lg border-b pb-3 text-foreground">Talep Kriterleri</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Bütçe Aralığı</p>
                                <p className="text-xl font-black text-primary">
                                    {lead.budgetMin ? `₺${lead.budgetMin / 1000000}M - ₺${(lead.budgetMax || 0) / 1000000}M` : 'Belirlenmedi'}
                                </p>
                            </div>
                            <div className="p-4 bg-secondary/50 rounded-xl">
                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Tercih Edilen Bölge</p>
                                <p className="font-bold text-foreground">{lead.preferredArea || 'Belirtilmedi'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Müşteri Notları</p>
                                <p className="text-sm leading-relaxed text-muted-foreground bg-secondary/30 p-4 rounded-xl italic">
                                    &quot;{lead.notes || 'Not eklenmemiş.'}&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-panel p-6 rounded-2xl space-y-3">
                        <h3 className="font-bold text-lg border-b pb-3">Hızlı İşlemler</h3>
                        <Link
                            href="/offers/new"
                            className="w-full py-3 flex items-center justify-center gap-2 rounded-xl font-bold premium-gradient text-white hover:scale-[1.02] transition-all shadow-md"
                        >
                            <BadgeDollarSign className="w-5 h-5" />
                            Teklif Hazırla
                        </Link>
                        <button
                            onClick={() => setIsNoteOpen(true)}
                            className="w-full py-3 flex items-center justify-center gap-2 rounded-xl font-bold border hover:bg-accent transition-colors"
                        >
                            <FileText className="w-5 h-5" />
                            Not Ekle
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Interaction Timeline */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <History className="w-6 h-6 text-primary" />
                                Görüşme Geçmişi
                            </h3>
                            <button
                                onClick={() => setIsNoteOpen(true)}
                                className="flex items-center gap-1.5 text-primary text-sm font-bold hover:underline"
                            >
                                <Plus className="w-4 h-4" />
                                Not Ekle
                            </button>
                        </div>

                        <div className="space-y-4 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/50">
                            {interactions.map((interaction) => (
                                <div key={interaction.id} className="relative pl-14">
                                    <div className="absolute left-3 top-2 w-7 h-7 rounded-full bg-white border-4 border-secondary flex items-center justify-center z-10">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <div className="glass-panel p-4 rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{interaction.date}</p>
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest",
                                                interactionTypeColors[interaction.type] ?? 'bg-secondary text-muted-foreground'
                                            )}>
                                                {interactionTypeLabels[interaction.type] ?? interaction.type}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium">{interaction.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Matching Properties */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                Eşleşen Portföyler
                            </h3>
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black">AI Önerisi</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: 'Lüks 3+1 Daire - Beşiktaş', price: '₺12.500.000', match: '%95', id: '1' },
                                { title: 'Geniş 2+1 Rezidans - Şişli', price: '₺9.800.000', match: '%87', id: '2' },
                            ].map((property) => (
                                <div key={property.id} className="glass-panel p-4 rounded-2xl flex gap-4 hover:border-primary/30 transition-all cursor-pointer group">
                                    <div className="w-20 h-20 rounded-xl premium-gradient opacity-20 shrink-0" />
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{property.title}</h4>
                                        <p className="text-[10px] text-muted-foreground font-bold">{property.price} • {property.match} Eşleşme</p>
                                        <div className="flex gap-3 mt-3">
                                            <Link href={`/properties/${property.id}`} className="text-[11px] font-black text-primary hover:underline flex items-center gap-1">
                                                Detay
                                            </Link>
                                            <button
                                                onClick={() => window.open(getWhatsAppShareLink(`İlginizi çekebilecek bir portföy: ${property.title}. Detaylar için görüşelim.`), '_blank')}
                                                className="text-[11px] font-black text-emerald-600 hover:underline"
                                            >
                                                Paylaş
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hazırlanan Teklifler */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <BadgeDollarSign className="w-6 h-6 text-primary" />
                                Hazırlanan Teklifler
                                <span className="ml-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-black">{leadOffers.length}</span>
                            </h3>
                            <Link
                                href="/offers/new"
                                className="flex items-center gap-1.5 text-primary text-sm font-bold hover:underline"
                            >
                                <Plus className="w-4 h-4" />
                                Yeni Teklif
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {leadOffers.map((offer) => (
                                <div key={offer.id} className="glass-panel p-5 rounded-2xl flex items-center gap-4 group hover:shadow-lg transition-all border-border/50">
                                    {/* Status Icon */}
                                    <div className={cn(
                                        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                                        offer.status === 'sent' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                    )}>
                                        {offer.status === 'sent'
                                            ? <CheckCircle2 className="w-6 h-6" />
                                            : <Clock className="w-6 h-6" />}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="font-bold text-sm truncate">{offer.property}</p>
                                            <span className={cn(
                                                'shrink-0 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest',
                                                offer.status === 'sent' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            )}>
                                                {offer.status === 'sent' ? 'Gönderildi' : 'Taslak'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            <span className="font-bold text-foreground">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(offer.price)}
                                            </span>
                                            {' • '}{offer.date}
                                            {' • '}<span className="font-mono text-[10px]">{offer.id}</span>
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href="/offers/new"
                                            className="p-2 rounded-lg border hover:bg-accent transition-colors"
                                            title="Teklifi Görüntüle / PDF"
                                        >
                                            <Download className="w-4 h-4 text-muted-foreground" />
                                        </Link>
                                        {offer.status === 'sent' && (
                                            <button
                                                onClick={() => window.open(getWhatsAppShareLink(`Merhaba ${lead.name}, daha önce hazırladığım ${offer.property} teklifini tekrar iletiyorum. Belge No: ${offer.id}`), '_blank')}
                                                className="p-2 rounded-lg border hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                                                title="WhatsApp ile Tekrar Gönder"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                            </button>
                                        )}
                                        {offer.status === 'draft' && (
                                            <Link
                                                href="/offers/new"
                                                className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Tamamla
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {leadOffers.length === 0 && (
                                <div className="text-center py-10 text-muted-foreground">
                                    <BadgeDollarSign className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                    <p className="text-sm font-medium">Henüz teklif hazırlanmamış</p>
                                    <Link href="/offers/new" className="text-primary text-sm font-bold hover:underline mt-1 inline-block">İlk teklifi hazırla →</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Note Modal */}
            {isNoteOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-card rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" />
                                Not Ekle
                            </h3>
                            <button
                                onClick={() => setIsNoteOpen(false)}
                                className="p-2 hover:bg-accent rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Müşteriyle ilgili notunuzu yazın..."
                            className="w-full h-36 p-4 rounded-xl bg-secondary/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                            autoFocus
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setIsNoteOpen(false)}
                                className="flex-1 py-3 border rounded-xl font-bold hover:bg-accent transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleAddNote}
                                className="flex-1 py-3 premium-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                            >
                                <Send className="w-4 h-4" />
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    );
}
