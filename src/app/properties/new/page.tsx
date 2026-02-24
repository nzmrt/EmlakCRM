'use client';

import React, { useState } from 'react';
import {
    Building2,
    MapPin,
    TurkishLira,
    Camera,
    Sparkles,
    Layout,
    Save,
    ChevronLeft,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NewPropertyPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [description, setDescription] = useState('');

    const generateAIContent = async () => {
        setIsGenerating(true);
        // Mimic API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDescription("Bu muhteşem 3+1 daire, İstanbul'un kalbi Şişli'de, toplu taşımaya ve alışveriş merkezlerine yürüme mesafesinde yer almaktadır. Modern mimarisi, geniş iç hacmi ve yüksek kaliteli malzemeleriyle konforlu bir yaşam sunar. Güney cephe olması sayesinde gün boyu güneş alan daire, ebeveyn banyosu ve geniş balkonuyla öne çıkmaktadır.");
        setIsGenerating(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/properties" className="p-2 hover:bg-accent rounded-full transition-colors border">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Yeni Portföy Ekle</h2>
                        <p className="text-muted-foreground mt-1">İlan detaylarını aşağıdan girin ve AI desteğiyle açıklama oluşturun.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-8 rounded-2xl space-y-6">
                        <h3 className="text-xl font-bold border-b pb-4">Temel Bilgiler</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1">İlan Başlığı</label>
                                <div className="relative group">
                                    <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input type="text" placeholder="Örn: Modern 3+1 Bahçe Katı" className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1">Fiyat (TL)</label>
                                <div className="relative group">
                                    <TurkishLira className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input type="number" placeholder="0" className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1">Konum</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input type="text" placeholder="İlçe, Mahalle" className="w-full pl-10 pr-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1">Emlak Tipi</label>
                                <select className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                                    <option>Konut</option>
                                    <option>Ticari</option>
                                    <option>Arsa</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* AI Description Section */}
                    <div className="glass-panel p-8 rounded-2xl space-y-6 relative overflow-hidden">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="text-xl font-bold">İlan Açıklaması</h3>
                            <button
                                onClick={generateAIContent}
                                disabled={isGenerating}
                                className="flex items-center gap-2 premium-gradient px-4 py-2 rounded-lg text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                {isGenerating ? "Oluşturuluyor..." : "AI ile Hazırla"}
                            </button>
                        </div>

                        <textarea
                            rows={8}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ziyaretçilerinizi etkileyecek bir açıklama yazın veya AI ile otomatik oluşturun..."
                            className="w-full p-4 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
                        />
                    </div>
                </div>

                {/* Right Column: Photos & Save */}
                <div className="space-y-6">
                    <div className="glass-panel p-8 rounded-2xl space-y-6">
                        <h3 className="text-xl font-bold border-b pb-4 text-foreground">Fotoğraflar</h3>
                        <div className="aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                            <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            <p className="text-xs font-bold text-muted-foreground">Fotoğraf Yüklemek İçin Tıklayın</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full py-4 premium-gradient text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 hover:-translate-y-1 transition-all">
                            <Save className="w-6 h-6" />
                            Portföyü Kaydet
                        </button>
                        <button className="w-full py-4 glass-panel rounded-2xl font-bold text-muted-foreground hover:bg-rose-50 hover:text-rose-600 transition-all">
                            İptal Et
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
