'use client';

import React from 'react';
import {
  TrendingUp,
  Users,
  Home,
  Clock,
  ArrowUpRight,
  Plus,
  MessageSquare,
  BadgePercent
} from 'lucide-react';
import { cn, getWhatsAppShareLink } from '@/lib/utils';
import { PROPERTIES, LEADS, OFFERS } from '@/lib/data';
import Link from 'next/link';

export default function DashboardPage() {
  const activePropertiesCount = PROPERTIES.filter(p => p.status === 'active').length;
  const newLeadsCount = LEADS.filter(l => l.status === 'new').length;
  const totalOffersCount = OFFERS.length;

  const handleDownloadReport = () => {
    alert('Rapor hazırlanıyor ve birazdan indirilecek...');
    // Simulated download
    const blob = new Blob(['Mock CRM Report Data'], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CRM_Rapor_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
  };

  const handleCompleteEIDS = () => {
    alert('e-Devlet entegrasyon sayfasına yönlendiriliyorsunuz...');
  };

  const stats = [
    { label: 'Aktif Portföyler', value: activePropertiesCount.toString(), icon: Home, trend: '+3 bu hafta', color: 'text-blue-600', bg: 'bg-blue-50', href: '/properties' },
    { label: 'Yeni Müşteriler', value: newLeadsCount.toString(), icon: Users, trend: '+12% artış', color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/leads' },
    { label: 'Bekleyen Randevular', value: '8', icon: Clock, trend: '2 bugün', color: 'text-amber-600', bg: 'bg-amber-50', href: '/calendar' },
    { label: 'Toplam Teklif', value: totalOffersCount.toString(), icon: TrendingUp, trend: 'Hedefin %85i', color: 'text-violet-600', bg: 'bg-violet-50', href: '/offers' },
  ];

  const recentProperties = PROPERTIES.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Hoş geldin, <span className="text-primary italic">Ahmet Bey</span> 👋</h2>
          <p className="text-muted-foreground mt-1 text-base md:text-lg">İşte bugün neler oluyor: Gayrimenkul piyasasında hareketlilik var.</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleDownloadReport}
            className="flex-1 sm:flex-none px-4 py-2 border rounded-xl font-medium hover:bg-accent transition-colors text-sm md:text-base"
          >
            Rapor İndir
          </button>
          <Link href="/leads/new" className="flex-1 sm:flex-none px-4 py-2 premium-gradient text-white rounded-xl font-medium shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-sm md:text-base">
            <Plus className="w-4 h-4" />
            Yeni Lead
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="glass-panel p-6 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group block relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl shadow-sm", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground tracking-tight uppercase">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1 tracking-tighter">{stat.value}</h3>
              <div className="flex items-center gap-2 mt-3">
                <span className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider",
                  stat.color.replace('text-', 'bg-').replace('-600', '-100'),
                  stat.color
                )}>
                  {stat.trend}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium italic">geçen aya göre</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Properties */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Son İlanlar</h3>
            <Link href="/properties" className="text-primary text-sm font-bold hover:underline">Tümünü Gör</Link>
          </div>
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <Link key={property.id} href={`/properties/${property.id}`} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 glass-panel rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer border border-border/50 block">
                <div className="w-full sm:w-20 h-40 sm:h-20 rounded-xl overflow-hidden relative shrink-0">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 premium-gradient opacity-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{property.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{property.address} • {property.sqft}m²</p>
                  <div className="flex items-center justify-between sm:justify-start gap-3 mt-2">
                    <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md uppercase tracking-wider">
                      {property.status === 'active' ? 'Aktif' : 'Beklemede'}
                    </span>
                    <span className="text-lg font-black text-primary">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(property.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions / Integration Status */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Hızlı İşlemler</h3>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => window.open(getWhatsAppShareLink("Merhaba, size özel hazırladığım portföy listesini buradan inceleyebilirsiniz: [Web Sitesi Linki]"), '_blank')}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group w-full"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">WhatsApp ile Paylaş</p>
                <p className="text-xs text-muted-foreground">Müşterine tek tıkla portföy gönder.</p>
              </div>
            </button>
            <Link
              href="/offers/new"
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-border hover:border-violet-400/50 hover:bg-violet-50 transition-all text-left group w-full"
            >
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
                <BadgePercent className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Teklif Hazırla</p>
                <p className="text-xs text-muted-foreground">AI destekli teklif mektubu oluştur.</p>
              </div>
            </Link>
          </div>

          <div className="p-6 glass-panel rounded-2xl premium-gradient text-white mt-8 shadow-2xl shadow-primary/30">
            <h4 className="font-bold text-lg mb-2">EİDS Doğrulama</h4>
            <p className="text-sm opacity-90 mb-4">Yetki belgeniz eksik görünüyor. İlan paylaşımı için e-Devlet entegrasyonunu tamamlayın.</p>
            <button
              onClick={handleCompleteEIDS}
              className="w-full py-2 bg-white text-primary rounded-lg font-black text-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              Şimdi Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
