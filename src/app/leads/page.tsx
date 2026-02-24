'use client';

import React, { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    UserPlus,
    Mail,
    Phone,
    MessageSquare,
    MoreHorizontal,
    Tag,
    Trash2,
    Edit3,
    FileText,
    ChevronRight,
    MessageCircle,
    X,
    Send
} from 'lucide-react';
import { cn, getWhatsAppDirectLink } from '@/lib/utils';
import { LEADS } from '@/lib/data';
import { Lead } from '@/types';
import Link from 'next/link';

const statusStyles = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-amber-100 text-amber-700',
    qualified: 'bg-emerald-100 text-emerald-700',
    lost: 'bg-rose-100 text-rose-700',
    won: 'bg-indigo-100 text-indigo-700',
};

const statusLabels = {
    new: 'Yeni',
    contacted: 'İletişime Geçildi',
    qualified: 'Nitelikli',
    lost: 'Kaybedildi',
    won: 'Kazanıldı',
};

export default function LeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [leads, setLeads] = useState<Lead[]>(LEADS);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [noteText, setNoteText] = useState('');

    const filteredLeads = leads.filter((lead: Lead) => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone.includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    const handleDeleteLead = (id: string) => {
        if (window.confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
            setLeads(leads.filter(l => l.id !== id));
        }
    };

    const handleEditLead = (id: string) => {
        alert(`${id} ID'li müşteri düzenleme moduna alınıyor...`);
    };

    const handleAddNote = () => {
        if (!noteText.trim()) return;
        alert(`"${noteText}" notu ${selectedLeadId} ID'li müşteriye eklendi.`);
        setNoteText('');
        setIsNoteModalOpen(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Müşteri Yönetimi</h2>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">Potansiyel alıcı ve kiracı adaylarını buradan takip edin.</p>
                </div>
                <Link href="/leads/new" className="premium-gradient px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm md:text-base">
                    <UserPlus className="w-5 h-5" />
                    Yeni Müşteri Ekle
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="İsim, e-posta veya telefon ara..."
                        className="w-full pl-12 pr-4 py-3 glass-panel rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-card text-sm md:text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={cn(
                        "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm flex-1 sm:flex-none",
                        isFilterOpen ? "bg-primary text-white" : "glass-panel hover:bg-accent"
                    )}
                >
                    <Filter className="w-5 h-5" />
                    Filtrele
                </button>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
                <div className="glass-panel p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-muted-foreground ml-1">Müşteri Durumu</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 bg-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                        >
                            <option value="all">Tümü</option>
                            {Object.entries(statusLabels).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end pb-0.5">
                        <button
                            onClick={() => { setSearchTerm(''); setFilterStatus('all'); }}
                            className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100"
                        >
                            <X className="w-4 h-4" />
                            Sıfırla
                        </button>
                    </div>
                </div>
            )}

            <div className="glass-panel rounded-2xl border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-border/50 bg-muted/30">
                                <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Müşteri</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Kaynak</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Kayıt Tarihi</th>
                                <th className="px-6 py-4 text-sm font-bold text-muted-foreground uppercase tracking-wider text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredLeads.map((lead: Lead) => (
                                <tr key={lead.id} className="hover:bg-accent/30 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <Link href={`/leads/${lead.id}`} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full premium-gradient flex items-center justify-center text-white font-bold text-xs shadow-md">
                                                {lead.name.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground group-hover:text-primary transition-colors">{lead.name}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                                    <Mail className="w-3 h-3" />
                                                    <span>{lead.email}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
                                            statusStyles[lead.status as keyof typeof statusStyles]
                                        )}>
                                            {statusLabels[lead.status as keyof typeof statusLabels]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground italic">
                                        <div className="flex items-center gap-1.5">
                                            <Tag className="w-3.5 h-3.5" />
                                            {lead.source}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {new Date(lead.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(getWhatsAppDirectLink(lead.phone, `Merhaba ${lead.name}, müsaitseniz portföylerimiz üzerine görüşmek isteriz.`), '_blank');
                                                }}
                                                className="p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                                                title="WhatsApp"
                                            >
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCall(lead.phone);
                                                }}
                                                className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                                                title="Ara"
                                            >
                                                <Phone className="w-5 h-5" />
                                            </button>
                                            <div className="relative group/menu">
                                                <button
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                                                >
                                                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                                </button>

                                                {/* Action Dropdown */}
                                                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-border rounded-xl shadow-xl py-2 hidden group-hover/menu:block animate-in fade-in zoom-in-95 duration-200 z-50 text-left">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleEditLead(lead.id); }}
                                                        className="w-full px-4 py-2 text-sm font-bold text-foreground hover:bg-accent flex items-center gap-2"
                                                    >
                                                        <Edit3 className="w-4 h-4" /> Düzenle
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setSelectedLeadId(lead.id); setIsNoteModalOpen(true); }}
                                                        className="w-full px-4 py-2 text-sm font-bold text-foreground hover:bg-accent flex items-center gap-2"
                                                    >
                                                        <FileText className="w-4 h-4" /> Not Ekle
                                                    </button>
                                                    <div className="h-px bg-border my-1" />
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead.id); }}
                                                        className="w-full px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Sil
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Note Modal */}
            {isNoteModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
                        <button
                            onClick={() => setIsNoteModalOpen(false)}
                            className="absolute right-6 top-6 p-2 hover:bg-accent rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Not Ekle
                        </h3>
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Müşteriyle ilgili notunuzu yazın..."
                            className="w-full h-36 p-4 rounded-xl bg-secondary/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm mb-4"
                            autoFocus
                        />
                        <button
                            onClick={handleAddNote}
                            className="w-full py-4 premium-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <Send className="w-4 h-4" />
                            Kaydet
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
