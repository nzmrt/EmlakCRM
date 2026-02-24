'use client';

import React, { useState } from 'react';
import {
    FileText,
    User,
    Building2,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Download,
    Send,
    CheckCircle2,
    Clock,
    TurkishLira,
    Plus,
    Mail
} from 'lucide-react';
import Link from 'next/link';
import { cn, getWhatsAppShareLink } from '@/lib/utils';
import { PROPERTIES, LEADS } from '@/lib/data';
import { Printer } from 'lucide-react';

type Step = 'select-client' | 'select-property' | 'ai-generate' | 'final-review';

export default function NewOfferPage() {
    const [currentStep, setCurrentStep] = useState<Step>('select-client');
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [offerText, setOfferText] = useState('');

    const generateAIProposal = () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            const client = LEADS.find(c => c.id === selectedClient);
            const property = PROPERTIES.find(p => p.id === selectedProperty);

            const proposal = `Sayın ${client?.name},\n\nSizinle yapmış olduğumuz görüşmeler doğrultusunda, ${property?.address} bölgesinde yer alan "${property?.title}" portföyümüz için hazırladığım özel teklif aşağıdadır.\n\nBu mülk, ${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(property?.price || 0)} liste fiyatı ile bölgedeki en avantajlı seçeneklerden biri olup, modern mimarisi ve yüksek yatırım potansiyeli ile aradığınız kriterleri tam olarak karşılamaktadır.\n\nSize özel ödeme planları ve detaylı sunum için müsait olduğunuz bir zamanda görüşmekten memnuniyet duyarım.\n\nSaygılarımla,\nEmlakCRM Profesyonel Ekibi`;

            setOfferText(proposal);
            setIsGenerating(false);
            setCurrentStep('ai-generate');
        }, 2000);
    };

    const handlePrint = () => {
        const client = LEADS.find(c => c.id === selectedClient);
        const property = PROPERTIES.find(p => p.id === selectedProperty);
        const offerNo = `#OFF-${String(new Date().getFullYear()).slice(-2)}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
        const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
        const bodyText = offerText.replace(/\n/g, '<br/>');

        const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>Teklif Mektubu - ${client?.name ?? ''}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Georgia, serif; color: #1a1a1a; background: #fff; }
    .header { background:#0f172a; padding:24px 48px; display:flex; justify-content:space-between; align-items:center; }
    .logo-wrap { display:flex; align-items:center; gap:16px; }
    .logo-box { width:40px; height:40px; background:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; }
    .logo-title { color:#fff; font-size:22px; font-weight:900; letter-spacing:-0.5px; }
    .logo-sub { color:rgba(255,255,255,0.5); font-size:9px; letter-spacing:4px; text-transform:uppercase; margin-top:2px; }
    .contact { text-align:right; color:rgba(255,255,255,0.6); font-size:11px; line-height:1.8; }
    .accent { display:flex; }
    .accent-dark { flex:1; height:4px; background:#0f172a; }
    .accent-gold { width:96px; height:4px; background:#f59e0b; }
    .meta { padding:28px 48px 16px; display:flex; justify-content:space-between; }
    .meta-label { font-size:9px; text-transform:uppercase; letter-spacing:3px; color:#9ca3af; margin-bottom:4px; }
    .meta-val { font-size:12px; color:#6b7280; }
    .meta-val strong { color:#374151; }
    .divider { margin:0 48px; border:none; border-top:1px solid #e5e7eb; }
    .recipient { padding:28px 48px 20px; }
    .recipient-label { font-size:9px; text-transform:uppercase; letter-spacing:3px; color:#9ca3af; margin-bottom:8px; }
    .recipient-name { font-size:20px; font-weight:700; color:#0f172a; }
    .recipient-phone { font-size:12px; color:#6b7280; margin-top:4px; }
    .subject { margin:0 48px 24px; background:#f9fafb; border-left:4px solid #0f172a; padding:16px 24px; }
    .subject-label { font-size:9px; text-transform:uppercase; letter-spacing:3px; color:#9ca3af; margin-bottom:4px; }
    .subject-text { font-size:14px; font-weight:700; color:#0f172a; }
    .body { padding:0 48px 32px; font-size:13px; line-height:2; color:#374151; }
    .sig { padding:32px 48px 24px; }
    .sig-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; }
    .sig-line { width:180px; border-bottom:1px solid #9ca3af; margin-bottom:10px; }
    .sig-name { font-size:13px; font-weight:700; }
    .sig-role { font-size:11px; color:#6b7280; }
    .footer-accent { display:flex; }
    .footer-accent-gold { width:96px; height:2px; background:#f59e0b; }
    .footer-accent-dark { flex:1; height:2px; background:#0f172a; }
    .footer { background:#0f172a; padding:14px 48px; display:flex; justify-content:space-between; align-items:center; }
    .footer p { color:rgba(255,255,255,0.35); font-size:9px; letter-spacing:1px; text-transform:uppercase; }
    @media print { @page { margin:0; } body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-wrap">
      <div class="logo-box">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#0f172a" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
      <div>
        <div class="logo-title">EmlakCRM</div>
        <div class="logo-sub">Profesyonel Gayrimenkul</div>
      </div>
    </div>
    <div class="contact">
      <div>Bağlantı Cad. No:42, Levent / İstanbul</div>
      <div>+90 212 000 00 00 &bull; info@emlakcrm.com</div>
      <div>www.emlakcrm.com</div>
    </div>
  </div>
  <div class="accent"><div class="accent-dark"></div><div class="accent-gold"></div></div>

  <div class="meta">
    <div>
      <div class="meta-label">Teklif Belgesi</div>
      <div class="meta-val">Tarih: <strong>${dateStr}</strong></div>
    </div>
    <div style="text-align:right">
      <div class="meta-label">Belge No</div>
      <div class="meta-val"><strong>${offerNo}</strong></div>
    </div>
  </div>
  <hr class="divider" />

  <div class="recipient">
    <div class="recipient-label">Sayın,</div>
    <div class="recipient-name">${client?.name ?? '—'}</div>
    <div class="recipient-phone">${client?.phone ?? ''}</div>
  </div>

  <div class="subject">
    <div class="subject-label">Konu</div>
    <div class="subject-text">Gayrimenkul Teklif Mektubu &mdash; ${property?.title ?? ''}</div>
  </div>

  <div class="body">${bodyText}</div>

  <div class="sig">
    <div class="sig-grid">
      <div><div class="sig-line"></div><div class="sig-name">EmlakCRM Danışmanı</div><div class="sig-role">Kıdemli Gayrimenkul Uzmanı</div></div>
      <div><div class="sig-line"></div><div class="sig-name">${client?.name ?? 'Alıcı İmzası'}</div><div class="sig-role">Müşteri</div></div>
    </div>
  </div>

  <div class="footer-accent"><div class="footer-accent-gold"></div><div class="footer-accent-dark"></div></div>
  <div class="footer">
    <p>EmlakCRM Profesyonel Gayrimenkul Çözümleri &bull; Her Hakkı Saklıdır &copy; ${new Date().getFullYear()}</p>
    <p>Bu belge EmlakCRM platformu üzerinden oluşturulmuştur.</p>
  </div>

  <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; }<\/script>
</body>
</html>`;

        const printWin = window.open('', '_blank', 'width=860,height=1100,scrollbars=yes');
        if (printWin) {
            printWin.document.write(html);
            printWin.document.close();
        }
    };

    const handleShare = () => {
        const client = LEADS.find(c => c.id === selectedClient);
        const text = `Merhaba ${client?.name}, sizin için hazırladığım teklif mektubunu ekte/aşağıda bulabilirsiniz:\n\n${offerText}`;
        window.open(getWhatsAppShareLink(text), '_blank');
    };

    const handleEmail = () => {
        const client = LEADS.find(c => c.id === selectedClient);
        const subject = encodeURIComponent("Gayrimenkul Teklif Mektubu");
        const body = encodeURIComponent(offerText);
        window.location.href = `mailto:${client?.name}@example.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-accent rounded-full transition-colors border shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Teklif Hazırla</h2>
                        <p className="text-muted-foreground mt-1">Yapay zeka desteğiyle profesyonel teklif mektupları oluşturun.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", currentStep === 'select-client' ? "bg-primary" : "bg-muted")} />
                    <div className={cn("w-3 h-3 rounded-full", currentStep === 'select-property' ? "bg-primary" : "bg-muted")} />
                    <div className={cn("w-3 h-3 rounded-full", currentStep === 'ai-generate' ? "bg-primary" : "bg-muted")} />
                    <div className={cn("w-3 h-3 rounded-full", currentStep === 'final-review' ? "bg-primary" : "bg-muted")} />
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">

                    {/* STEP 1: Select Client */}
                    {currentStep === 'select-client' && (
                        <div className="glass-panel p-8 rounded-3xl space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <User className="w-6 h-6 text-primary" />
                                Müşteri Seçin
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {LEADS.map((client) => (
                                    <div
                                        key={client.id}
                                        onClick={() => setSelectedClient(client.id)}
                                        className={cn(
                                            "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                                            selectedClient === client.id ? "border-primary bg-primary/5 shadow-lg" : "border-border/50 hover:border-primary/20 hover:bg-accent/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors",
                                                selectedClient === client.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                                            )}>
                                                {client.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold">{client.name}</p>
                                                <p className="text-xs text-muted-foreground">{client.phone}</p>
                                            </div>
                                        </div>
                                        {selectedClient === client.id && <CheckCircle2 className="w-6 h-6 text-primary" />}
                                    </div>
                                ))}
                            </div>
                            <button
                                disabled={!selectedClient}
                                onClick={() => setCurrentStep('select-property')}
                                className="w-full premium-gradient py-4 text-white rounded-2xl font-black shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 group"
                            >
                                Sonraki Adım: Portföy Seçimi
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {/* STEP 2: Select Property */}
                    {currentStep === 'select-property' && (
                        <div className="glass-panel p-8 rounded-3xl space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Building2 className="w-6 h-6 text-primary" />
                                Portföy Seçin
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {PROPERTIES.map((prop) => (
                                    <div
                                        key={prop.id}
                                        onClick={() => setSelectedProperty(prop.id)}
                                        className={cn(
                                            "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                                            selectedProperty === prop.id ? "border-primary bg-primary/5 shadow-lg" : "border-border/50 hover:border-primary/20 hover:bg-accent/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                                selectedProperty === prop.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                                            )}>
                                                <Building2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold">{prop.title}</p>
                                                <p className="text-xs text-muted-foreground">{prop.address} • {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(prop.price)}</p>
                                            </div>
                                        </div>
                                        {selectedProperty === prop.id && <CheckCircle2 className="w-6 h-6 text-primary" />}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCurrentStep('select-client')}
                                    className="flex-1 border-2 border-border py-4 rounded-2xl font-bold hover:bg-accent transition-colors"
                                >
                                    Geri
                                </button>
                                <button
                                    disabled={!selectedProperty}
                                    onClick={generateAIProposal}
                                    className="flex-[2] premium-gradient py-4 text-white rounded-2xl font-black shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 group"
                                >
                                    {isGenerating ? (
                                        <Clock className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 animate-pulse" />
                                    )}
                                    {isGenerating ? "AI Hazırlıyor..." : "Mektubu Oluştur (AI)"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: AI Generate Review */}
                    {currentStep === 'ai-generate' && (
                        <div className="glass-panel p-8 rounded-3xl space-y-6 animate-in zoom-in-95">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-primary" />
                                Hazırlanan Teklif Mektubu
                            </h3>
                            <textarea
                                value={offerText}
                                onChange={(e) => setOfferText(e.target.value)}
                                className="w-full h-80 p-6 bg-secondary/30 rounded-2xl border-2 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm leading-relaxed"
                            />
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCurrentStep('select-property')}
                                    className="flex-1 border-2 border-border py-4 rounded-2xl font-bold hover:bg-accent transition-colors"
                                >
                                    Geri
                                </button>
                                <button
                                    onClick={() => setCurrentStep('final-review')}
                                    className="flex-[2] premium-gradient py-4 text-white rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    Devam Et
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Final Review & Send */}
                    {currentStep === 'final-review' && (
                        <div className="glass-panel p-8 rounded-3xl space-y-8 animate-in slide-in-from-top-4">
                            <div className="text-center space-y-4">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-emerald-200">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black italic text-foreground">Teklif Hazır!</h3>
                                <p className="text-muted-foreground">Müşterinize nasıl ulaştırmak istersiniz?</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
                                <button
                                    onClick={handlePrint}
                                    className="p-6 glass-panel rounded-2xl border-2 border-border hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left"
                                >
                                    <Download className="w-8 h-8 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
                                    <p className="font-black text-lg">PDF İndir / Yazdır</p>
                                    <p className="text-xs text-muted-foreground">Profesyonel antetli kağıtta PDF.</p>
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-6 glass-panel rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group text-left"
                                >
                                    <Send className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                    <p className="font-black text-lg">Hızlı Paylaş (WhatsApp)</p>
                                    <p className="text-xs text-muted-foreground">WhatsApp üzerinden anında gönder.</p>
                                </button>
                            </div>

                            <div className="flex gap-4 print:hidden">
                                <button
                                    onClick={handleEmail}
                                    className="flex-1 py-3 border-2 border-border rounded-xl font-bold hover:bg-accent transition-colors flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email ile Gönder
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    alert('Teklif kaydedildi ve paylaşıldı!');
                                    window.location.href = '/';
                                }}
                                className="w-full py-4 bg-foreground text-background rounded-2xl font-black hover:opacity-90 transition-opacity"
                            >
                                İşlemi Tamamla ve Anasayfaya Dön
                            </button>
                        </div>
                    )}

                </div>

                {/* Sidebar Status */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-3xl space-y-6 border-primary/20">
                        <h4 className="font-bold text-lg border-b pb-3">Teklif Özeti</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Müşteri</p>
                                    <p className="font-bold text-sm">{selectedClient ? LEADS.find(c => c.id === selectedClient)?.name : 'Seçilmedi'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                                    <Building2 className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Portföy</p>
                                    <p className="font-bold text-sm truncate max-w-[150px]">{selectedProperty ? PROPERTIES.find(p => p.id === selectedProperty)?.title : 'Seçilmedi'}</p>
                                </div>
                            </div>
                            {selectedProperty && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <TurkishLira className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Bedel</p>
                                        <p className="font-black text-emerald-600 text-sm">
                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(PROPERTIES.find(p => p.id === selectedProperty)?.price || 0)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 glass-panel rounded-3xl premium-gradient text-white shadow-2xl shadow-primary/30">
                        <Sparkles className="w-10 h-10 mb-4 opacity-50" />
                        <h4 className="font-bold text-lg mb-2">AI Asistan Tüyo</h4>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Müşteriler, mülkün yatırım değerine odaklanan tekliflere %40 daha hızlı yanıt veriyor. Teklif metnine kira getirisi tahminini de ekleyebilirim.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
