'use client';

import React, { useState } from 'react';
import {
    User,
    Bell,
    Shield,
    Smartphone,
    CreditCard,
    ChevronRight,
    LogOut,
    X,
    Check,
    Eye,
    EyeOff,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SectionId = 'profile' | 'notifications' | 'security' | 'integrations' | 'billing' | null;

const sections = [
    { id: 'profile' as SectionId, name: 'Profil Bilgileri', icon: User, desc: 'Kişisel bilgileriniz ve profil fotoğrafınız' },
    { id: 'notifications' as SectionId, name: 'Bildirimler', icon: Bell, desc: 'Email ve push bildirim ayarlarınız' },
    { id: 'security' as SectionId, name: 'Güvenlik', icon: Shield, desc: 'Şifre değiştirme ve 2FA ayarları' },
    { id: 'integrations' as SectionId, name: 'Entegrasyonlar', icon: Smartphone, desc: 'Sahibinden, Hepsiemlak ve EİDS bağlantıları' },
    { id: 'billing' as SectionId, name: 'Plan & Ödeme', icon: CreditCard, desc: 'Abonelik planınız ve faturalarınız' },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState<SectionId>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [saved, setSaved] = useState(false);
    const [notifications, setNotifications] = useState<Record<string, boolean>>({
        email: true,
        push: true,
        whatsapp: false,
        weekly: true,
    });
    const [profile, setProfile] = useState<Record<string, string>>({
        name: 'Ahmet Yılmaz',
        email: 'ahmet@emlakcrm.com',
        phone: '+90 532 000 0000',
        title: 'Kıdemli Gayrimenkul Danışmanı',
    });
    const [password, setPassword] = useState<Record<string, string>>({ current: '', new: '', confirm: '' });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleLogout = () => {
        if (confirm('Oturumu kapatmak istediğinizden emin misiniz?')) {
            alert('Oturum kapatıldı. (Demo)');
        }
    };

    const renderPanel = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="space-y-5">
                        <h4 className="font-bold text-lg border-b pb-3">Profil Bilgileri</h4>
                        <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl">
                            <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center text-white font-black text-2xl shadow-lg">
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="font-bold">{profile.name}</p>
                                <p className="text-sm text-muted-foreground">{profile.title}</p>
                            </div>
                        </div>
                        {[
                            { label: 'Ad Soyad', key: 'name', type: 'text' },
                            { label: 'E-posta', key: 'email', type: 'email' },
                            { label: 'Telefon', key: 'phone', type: 'tel' },
                            { label: 'Ünvan', key: 'title', type: 'text' },
                        ].map(field => (
                            <div key={field.key}>
                                <label className="text-xs font-black uppercase text-muted-foreground ml-1 mb-1 block">{field.label}</label>
                                <input
                                    type={field.type}
                                    value={profile[field.key]}
                                    onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                                    className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                />
                            </div>
                        ))}
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-5">
                        <h4 className="font-bold text-lg border-b pb-3">Bildirim Ayarları</h4>
                        {[
                            { key: 'email', label: 'E-posta Bildirimleri', desc: 'Yeni müşteri ve portföy bildirimleri' },
                            { key: 'push', label: 'Push Bildirimleri', desc: 'Tarayıcı push bildirimleri' },
                            { key: 'whatsapp', label: 'WhatsApp Bildirimleri', desc: 'WhatsApp iş hesabı üzerinden bildirim' },
                            { key: 'weekly', label: 'Haftalık Rapor', desc: 'Her Pazartesi haftalık özet e-postası' },
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                                <div>
                                    <p className="font-bold text-sm">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <button
                                    onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                                    className={cn(
                                        'relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0',
                                        notifications[item.key] ? 'bg-primary' : 'bg-gray-300'
                                    )}
                                    role="switch"
                                    aria-checked={notifications[item.key]}
                                >
                                    <span className={cn(
                                        'inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200',
                                        notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                                    )} />
                                </button>
                            </div>
                        ))}
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-5">
                        <h4 className="font-bold text-lg border-b pb-3">Şifre Değiştir</h4>
                        {[
                            { label: 'Mevcut Şifre', key: 'current' },
                            { label: 'Yeni Şifre', key: 'new' },
                            { label: 'Yeni Şifre (Tekrar)', key: 'confirm' },
                        ].map(field => (
                            <div key={field.key}>
                                <label className="text-xs font-black uppercase text-muted-foreground ml-1 mb-1 block">{field.label}</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password[field.key]}
                                        onChange={e => setPassword(p => ({ ...p, [field.key]: e.target.value }))}
                                        className="w-full px-4 pr-12 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        onClick={() => setShowPassword(s => !s)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="p-4 bg-secondary/30 rounded-xl">
                            <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">2FA Durumu</p>
                            <p className="text-sm font-bold text-amber-600">Aktif Değil</p>
                            <button className="mt-2 text-xs text-primary font-bold hover:underline">2FA&apos;yı Etkinleştir →</button>
                        </div>
                    </div>
                );
            case 'integrations':
                return (
                    <div className="space-y-5">
                        <h4 className="font-bold text-lg border-b pb-3">Entegrasyonlar</h4>
                        {[
                            { name: 'Sahibinden.com', status: 'Bağlı', connected: true },
                            { name: 'Hepsiemlak', status: 'Bağlı', connected: true },
                            { name: 'EİDS (Tapu)', status: 'Bağlı Değil', connected: false },
                            { name: 'Google Calendar', status: 'Bağlı Değil', connected: false },
                        ].map(int => (
                            <div key={int.name} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                                <div>
                                    <p className="font-bold text-sm">{int.name}</p>
                                    <p className={cn('text-xs font-bold', int.connected ? 'text-emerald-600' : 'text-muted-foreground')}>{int.status}</p>
                                </div>
                                <button className={cn(
                                    'px-4 py-1.5 rounded-lg text-xs font-black transition-all',
                                    int.connected
                                        ? 'border border-rose-200 text-rose-600 hover:bg-rose-50'
                                        : 'premium-gradient text-white shadow-sm hover:scale-[1.02]'
                                )}>
                                    {int.connected ? 'Bağlantıyı Kes' : 'Bağlan'}
                                </button>
                            </div>
                        ))}
                    </div>
                );
            case 'billing':
                return (
                    <div className="space-y-5">
                        <h4 className="font-bold text-lg border-b pb-3">Plan & Ödeme</h4>
                        <div className="p-5 rounded-2xl premium-gradient text-white">
                            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">Aktif Plan</p>
                            <h5 className="text-2xl font-black">Pro Plan</h5>
                            <p className="text-sm opacity-80 mt-1">₺499 / ay • Sonraki yenileme: 24 Mart 2024</p>
                        </div>
                        <div className="space-y-3">
                            {['Son 12 aylık fatura geçmişi', 'Kart bilgilerini güncelle', 'Planı düşür'].map(item => (
                                <button key={item} className="w-full p-4 text-left text-sm font-bold bg-secondary/30 rounded-xl hover:bg-accent transition-colors flex items-center justify-between">
                                    {item}
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </button>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-center sm:text-left">Ayarlar</h2>
                <p className="text-muted-foreground mt-1 text-base md:text-lg text-center sm:text-left">Hesabınızı ve uygulama tercihlerini buradan yönetin.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Section List */}
                <div className="space-y-3 lg:col-span-1">
                    <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-border/50 border border-border/50">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                                className={cn(
                                    'w-full p-4 sm:p-5 text-left transition-all flex items-center justify-between group',
                                    activeSection === section.id
                                        ? 'bg-primary/5 border-l-4 border-l-primary'
                                        : 'hover:bg-accent/30'
                                )}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className={cn(
                                        'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors',
                                        activeSection === section.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:scale-110'
                                    )}>
                                        <section.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <p className={cn('font-bold text-xs sm:text-sm', activeSection === section.id && 'text-primary')}>{section.name}</p>
                                        <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{section.desc}</p>
                                    </div>
                                </div>
                                <ChevronRight className={cn(
                                    'w-4 h-4 text-muted-foreground transition-transform shrink-0',
                                    activeSection === section.id && 'rotate-90 text-primary'
                                )} />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full p-5 glass-panel rounded-2xl border-rose-100 hover:bg-rose-50/50 transition-colors group flex items-center gap-4"
                    >
                        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm text-rose-600">Oturumu Kapat</p>
                            <p className="text-xs text-rose-600/60">Güvenli çıkış yap</p>
                        </div>
                    </button>
                </div>

                {/* Section Panel */}
                {activeSection && (
                    <div className="lg:col-span-2 glass-panel p-6 rounded-2xl animate-in slide-in-from-right-4 duration-300">
                        {renderPanel()}
                        <div className="flex gap-3 mt-6 pt-4 border-t">
                            <button
                                onClick={() => setActiveSection(null)}
                                className="flex items-center gap-2 px-4 py-2.5 border rounded-xl font-bold hover:bg-accent transition-colors text-sm"
                            >
                                <X className="w-4 h-4" /> Kapat
                            </button>
                            <button
                                onClick={handleSave}
                                className={cn(
                                    'flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all',
                                    saved
                                        ? 'bg-emerald-500 text-white'
                                        : 'premium-gradient text-white hover:scale-[1.02]'
                                )}
                            >
                                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                {saved ? 'Kaydedildi!' : 'Kaydet'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-center pt-4">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">EmlakCRM Pro v1.0.4 • © 2024</p>
            </div>
        </div>
    );
}
