'use client';

import React, { useState } from 'react';
import {
    Search,
    MapPin,
    BedDouble,
    Bath,
    Square,
    Plus,
    Filter,
    MoreVertical,
    ChevronRight,
    Building2,
    X,
    ChevronDown,
    ArrowUpDown,
    Trash2,
    Edit3
} from 'lucide-react';
import { cn, getWhatsAppShareLink } from '@/lib/utils';
import { PROPERTIES } from '@/lib/data';
import { Property } from '@/types';
import Link from 'next/link';

export default function PropertiesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterType, setFilterType] = useState<string>('all');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [minBedrooms, setMinBedrooms] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [properties, setProperties] = useState<Property[]>(PROPERTIES);

    const filteredProperties = properties
        .filter((property: Property) => {
            const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.address.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || property.type === filterType;
            const matchesMinPrice = minPrice === '' || property.price >= parseInt(minPrice) * 1000000;
            const matchesMaxPrice = maxPrice === '' || property.price <= parseInt(maxPrice) * 1000000;
            const matchesRooms = minBedrooms === 'all' || (property.bedrooms || 0) >= parseInt(minBedrooms);

            return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesRooms;
        })
        .sort((a: Property, b: Property) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    const resetFilters = () => {
        setSearchTerm('');
        setFilterType('all');
        setMinPrice('');
        setMaxPrice('');
        setMinBedrooms('all');
        setSortBy('newest');
    };

    const handleDeleteProperty = (id: string) => {
        if (window.confirm('Bu portföyü silmek istediğinize emin misiniz?')) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    const handleEditProperty = (id: string) => {
        alert(`${id} ID'li portföy düzenleme moduna alınıyor...`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-foreground">Portföy Yönetimi</h2>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">Toplam {filteredProperties.length} kayıtlı gayrimenkul bulunmaktadır.</p>
                </div>
                <Link href="/properties/new" className="premium-gradient px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap text-sm md:text-base">
                    <Plus className="w-5 h-5" />
                    Yeni Portföy Ekle
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="İlan adı, konum veya özellik ara..."
                            className="w-full pl-12 pr-4 py-3 glass-panel rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-card text-sm md:text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative group flex-1 sm:flex-none">
                            <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto pl-10 pr-8 py-3 glass-panel rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer font-bold text-sm bg-card"
                            >
                                <option value="newest">En Yeni</option>
                                <option value="price-asc">Fiyat (Artan)</option>
                                <option value="price-desc">Fiyat (Azalan)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
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
                </div>

                {/* Advanced Filter Panel */}
                {isFilterOpen && (
                    <div className="glass-panel p-6 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-muted-foreground ml-1">İlan Tipi</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 bg-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                            >
                                <option value="all">Tümü</option>
                                <option value="residential">Konut</option>
                                <option value="commercial">Ticari</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-muted-foreground ml-1">Min Oda</label>
                            <select
                                value={minBedrooms}
                                onChange={(e) => setMinBedrooms(e.target.value)}
                                className="w-full px-4 py-2 bg-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                            >
                                <option value="all">Farketmez</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-muted-foreground ml-1">Fiyat Aralığı (Milyon TL)</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full px-4 py-2 bg-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full px-4 py-2 bg-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                                />
                            </div>
                        </div>
                        <div className="flex items-end pb-0.5">
                            <button
                                onClick={resetFilters}
                                className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100"
                            >
                                <X className="w-4 h-4" />
                                Filtreleri Sıfırla
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Properties List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((property: Property) => (
                        <Link
                            key={property.id}
                            href={`/properties/${property.id}`}
                            className="glass-panel overflow-hidden rounded-2xl group cursor-pointer hover:shadow-2xl transition-all duration-500 border-border/50 block"
                        >
                            {/* Image Section */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg",
                                        property.status === 'active' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                                    )}>
                                        {property.status === 'active' ? 'Aktif' : 'Beklemede'}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 print:hidden group/menu">
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors relative cursor-pointer select-none"
                                    >
                                        <MoreVertical className="w-5 h-5" />

                                        {/* Dropdown Menu (Hover based) */}
                                        <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-border rounded-xl shadow-xl py-2 hidden group-hover/menu:block animate-in fade-in zoom-in-95 duration-200 z-50">
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEditProperty(property.id); }}
                                                className="w-full px-4 py-2 text-left text-sm font-bold text-foreground hover:bg-accent flex items-center gap-2"
                                            >
                                                <Edit3 className="w-4 h-4" /> Düzenle
                                            </button>
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteProperty(property.id); }}
                                                className="w-full px-4 py-2 text-left text-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" /> Sil
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-lg font-bold text-sm">
                                        {property.type === 'residential' ? 'Konut' : 'Ticari'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
                                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm truncate">{property.address}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-4 border-y border-border/50">
                                    <div className="flex items-center gap-4">
                                        {property.bedrooms && (
                                            <div className="flex items-center gap-1.5" title="Oda">
                                                <BedDouble className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-bold">{property.bedrooms}</span>
                                            </div>
                                        )}
                                        {property.bathrooms && (
                                            <div className="flex items-center gap-1.5" title="Banyo">
                                                <Bath className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-bold">{property.bathrooms}</span>
                                            </div>
                                        )}
                                        {property.sqft && (
                                            <div className="flex items-center gap-1.5" title="Alan">
                                                <Square className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-bold">{property.sqft} m²</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="text-2xl font-black text-primary">
                                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(property.price)}
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center glass-panel rounded-3xl">
                        <Building2 className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                        <p className="text-xl font-bold text-muted-foreground">Aradığınız kriterlere uygun portföy bulunamadı.</p>
                        <button onClick={() => setSearchTerm('')} className="mt-4 text-primary font-bold hover:underline">Aramayı Temizle</button>
                    </div>
                )}
            </div>
        </div>
    );
}
