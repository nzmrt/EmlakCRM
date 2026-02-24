'use client';

import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    User,
    MapPin,
    X,
    Send,
    Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MEETINGS } from '@/lib/data';

const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

const EVENT_TYPES = [
    { value: 'Viewing', label: 'Portföy Gezisi', color: 'bg-blue-100 text-blue-700' },
    { value: 'Contract', label: 'Sözleşme', color: 'bg-violet-100 text-violet-700' },
    { value: 'Meeting', label: 'Görüşme', color: 'bg-amber-100 text-amber-700' },
    { value: 'Shoot', label: 'Çekim', color: 'bg-emerald-100 text-emerald-700' },
    { value: 'Other', label: 'Diğer', color: 'bg-secondary text-muted-foreground' },
];

type Meeting = { id: number; time: string; title: string; client: string; type: string; day: number };

export default function CalendarPage() {
    const now = new Date();
    const [currentMonth, setCurrentMonth] = useState(now.getMonth());
    const [currentYear, setCurrentYear] = useState(now.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());
    const [meetings, setMeetings] = useState<Meeting[]>(MEETINGS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ title: '', client: '', time: '10:00', type: 'Meeting' });

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // First day: Monday=0 offset
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const offset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    const todayMeetings = meetings.filter(m => m.day === selectedDay);

    const handleAddEvent = () => {
        if (!form.title.trim()) return;
        const newEvent: Meeting = {
            // eslint-disable-next-line react-hooks/purity
            id: Math.floor(Math.random() * 1000000000),
            time: form.time,
            title: form.title.trim(),
            client: form.client.trim() || 'Belirtilmedi',
            type: form.type,
            day: selectedDay ?? now.getDate(),
        };
        setMeetings([...meetings, newEvent]);
        setForm({ title: '', client: '', time: '10:00', type: 'Meeting' });
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setMeetings(meetings.filter(m => m.id !== id));
    };

    const getTypeStyle = (type: string) =>
        EVENT_TYPES.find(t => t.value === type)?.color ?? 'bg-secondary text-muted-foreground';

    const getTypeLabel = (type: string) =>
        EVENT_TYPES.find(t => t.value === type)?.label ?? type;

    const daysWithEvents = new Set(meetings.map(m => m.day));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Ajanda ve Takvim</h2>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">Görüşmelerinizi ve randevularınızı buradan planlayın.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="premium-gradient px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-fit text-sm md:text-base"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Etkinlik
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Grid */}
                <div className="lg:col-span-2 glass-panel p-4 md:p-8 rounded-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-lg md:text-xl">{MONTHS[currentMonth]} {currentYear}</h3>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="p-2 hover:bg-accent rounded-lg border transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={nextMonth} className="p-2 hover:bg-accent rounded-lg border transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-px bg-border/50 rounded-xl overflow-hidden mb-1 border border-border/50">
                        {DAYS.map(day => (
                            <div key={day} className="bg-background/50 p-2 md:p-3 text-center text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                        {/* Empty cells for offset */}
                        {Array.from({ length: offset }).map((_, i) => (
                            <div key={`empty-${i}`} className="bg-background/20 h-14 md:h-20" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isToday = day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear();
                            const isSelected = day === selectedDay;
                            const hasEvent = daysWithEvents.has(day);
                            return (
                                <div
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={cn(
                                        'bg-background p-1 md:p-3 h-14 md:h-20 relative cursor-pointer group transition-colors flex flex-col items-center md:items-start',
                                        isSelected ? 'bg-primary/5' : 'hover:bg-accent/30'
                                    )}
                                >
                                    <span className={cn(
                                        'text-xs md:text-sm font-bold flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full transition-transform',
                                        isToday ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' :
                                            isSelected ? 'bg-primary/20 text-primary' :
                                                'group-hover:bg-secondary'
                                    )}>
                                        {day}
                                    </span>
                                    {hasEvent && (
                                        <div className="mt-1 flex gap-0.5 justify-center w-full md:block md:space-y-0.5">
                                            {meetings.filter(m => m.day === day).slice(0, 3).map(m => (
                                                <div key={m.id} className={cn('w-1 h-1 md:w-full md:h-1.5 rounded-full', getTypeStyle(m.type).split(' ')[0])} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Today's Schedule */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-6 h-6 text-primary" />
                        {selectedDay ? `${selectedDay} ${MONTHS[currentMonth]} Programı` : 'Bugünkü Program'}
                    </h3>
                    <div className="space-y-4">
                        {todayMeetings.length > 0 ? todayMeetings.sort((a, b) => a.time.localeCompare(b.time)).map((meeting) => (
                            <div key={meeting.id} className="glass-panel p-5 rounded-2xl hover:scale-[1.01] transition-transform cursor-pointer border-l-4 border-l-primary group">
                                <div className="flex items-center justify-between mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{meeting.time}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={cn('px-2 py-0.5 rounded-md', getTypeStyle(meeting.type))}>{getTypeLabel(meeting.type)}</span>
                                        <button
                                            onClick={() => handleDelete(meeting.id)}
                                            className="p-1 hover:bg-rose-50 hover:text-rose-600 rounded-md transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                                <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-sm">{meeting.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <User className="w-3.5 h-3.5" />
                                    <span>{meeting.client}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 glass-panel rounded-2xl">
                                <CalendarIcon className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
                                <p className="text-sm font-bold text-muted-foreground">Bu gün için etkinlik yok.</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-3 text-primary text-sm font-bold hover:underline flex items-center gap-1 mx-auto"
                                >
                                    <Plus className="w-4 h-4" /> Etkinlik Ekle
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-6 glass-panel rounded-2xl premium-gradient text-white shadow-2xl shadow-primary/30 text-center">
                        <CalendarIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
                        <h4 className="font-bold text-lg mb-1">Haftalık Özet</h4>
                        <p className="text-sm opacity-90 mb-4">Bu ay toplam <strong>{meetings.length}</strong> etkinlik planlandı.</p>
                        <button
                            onClick={() => setSelectedDay(null)}
                            className="w-full py-2.5 bg-white text-primary rounded-xl font-black text-sm hover:shadow-xl transition-all"
                        >
                            Tümünü Gör
                        </button>
                    </div>
                </div>
            </div>

            {/* New Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-card rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-primary" />
                                Yeni Etkinlik
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-accent rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black uppercase text-muted-foreground ml-1 mb-1 block">Etkinlik Adı *</label>
                                <input
                                    type="text"
                                    placeholder="ör. Portföy Sunumu - Beşiktaş"
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase text-muted-foreground ml-1 mb-1 block">Müşteri / Kişi</label>
                                <input
                                    type="text"
                                    placeholder="ör. Caner Demirdağ"
                                    value={form.client}
                                    onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                                    className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black uppercase text-muted-foreground ml-1 mb-1 block">Saat</label>
                                    <input
                                        type="time"
                                        value={form.time}
                                        onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                                        className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black uppercase text-muted-foreground ml-1 mb-1 block">Tür</label>
                                    <select
                                        value={form.type}
                                        onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                        className="w-full px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold appearance-none"
                                    >
                                        {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                    </select>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground ml-1">Gün: <strong>{selectedDay ?? now.getDate()} {MONTHS[currentMonth]}</strong></p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border rounded-xl font-bold hover:bg-accent transition-colors">
                                İptal
                            </button>
                            <button
                                onClick={handleAddEvent}
                                className="flex-1 py-3 premium-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                            >
                                <Send className="w-4 h-4" />
                                Ekle
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
