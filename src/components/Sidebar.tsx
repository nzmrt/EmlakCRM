'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Building2,
    Users,
    Calendar,
    Settings,
    LayoutDashboard,
    Plus,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Portföyler', href: '/properties', icon: Building2 },
    { name: 'Müşteriler', href: '/leads', icon: Users },
    { name: 'Takvim', href: '/calendar', icon: Calendar },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden"
                    onClick={onClose}
                />
            )}

            <div className={cn(
                "w-64 h-screen glass-panel fixed left-0 top-0 z-50 flex flex-col p-4 border-r transition-transform duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between lg:block">
                    <div className="flex items-center gap-3 px-3 py-6 mb-8">
                        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl tracking-tight">Emlak<span className="text-primary text-2xl font-black">CRM</span></h1>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Pro Edition</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-accent rounded-full mb-8"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "nav-link",
                                    isActive && "nav-link-active"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-auto pt-6 border-t border-border/50">
                    <Link href="/properties/new" onClick={onClose} className="w-full premium-gradient p-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 group">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        <span>Yeni İlan</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
