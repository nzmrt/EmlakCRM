import { Property, Lead, Offer } from '@/types';

export const PROPERTIES: Property[] = [
    {
        id: '1',
        title: 'Modern Boğaz Manzaralı Rezidans',
        address: 'Bebek, Beşiktaş, İstanbul',
        price: 45000000,
        type: 'residential',
        status: 'active',
        bedrooms: 4,
        bathrooms: 3,
        sqft: 280,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
        createdAt: '2024-02-20',
    },
    {
        id: '2',
        title: 'Geniş Bahçeli Müstakil Villa',
        address: 'Zekeriyaköy, Sarıyer, İstanbul',
        price: 32500000,
        type: 'residential',
        status: 'pending',
        bedrooms: 5,
        bathrooms: 4,
        sqft: 450,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
        createdAt: '2024-02-18',
    },
    {
        id: '3',
        title: 'A Plus Ofis Katı - Maslak',
        address: 'Maslak, Sarıyer, İstanbul',
        price: 18000000,
        type: 'commercial',
        status: 'active',
        sqft: 180,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
        createdAt: '2024-02-15',
    },
    {
        id: '4',
        title: 'Lüks Rezidans Dairesi - 3+1',
        address: 'Şişli, Merkez Mahallesi, İstanbul',
        price: 12500000,
        type: 'residential',
        status: 'active',
        bedrooms: 3,
        bathrooms: 2,
        sqft: 140,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
        createdAt: '2024-02-10',
    }
];

export const LEADS: Lead[] = [
    {
        id: '1',
        name: 'Caner Demirdağ',
        email: 'caner@example.com',
        phone: '0532 000 0000',
        status: 'qualified',
        source: 'WhatsApp',
        createdAt: '2024-02-24',
    },
    {
        id: '2',
        name: 'Ayşe Yılmaz',
        email: 'ayse@example.com',
        phone: '0533 111 2233',
        status: 'new',
        source: 'Web Sitesi',
        createdAt: '2024-02-23',
    },
    {
        id: '3',
        name: 'Murat Aydın',
        email: 'murat@example.com',
        phone: '0544 555 6677',
        status: 'contacted',
        source: 'Referans',
        createdAt: '2024-02-22',
    }
];

export const OFFERS: Offer[] = [
    {
        id: 'OFF-26-1042',
        client: 'Caner Demirdağ',
        property: 'Lüks 3+1 Daire - Beşiktaş',
        price: 12500000,
        date: '24 Şubat 2026',
        status: 'sent',
        channel: 'whatsapp',
        leadId: '1',
    },
    {
        id: 'OFF-26-0978',
        client: 'Caner Demirdağ',
        property: 'Geniş 2+1 Rezidans - Şişli',
        price: 9800000,
        date: '21 Şubat 2026',
        status: 'draft',
        channel: null,
        leadId: '1',
    },
    {
        id: 'OFF-26-0874',
        client: 'Ayşe Yılmaz',
        property: 'Boğaz Manzaralı Villa - Beşiktaş',
        price: 45000000,
        date: '18 Şubat 2026',
        status: 'sent',
        channel: 'email',
        leadId: '2',
    },
];

export const MEETINGS = [
    { id: 1, time: '10:00', title: 'Portföy Sunumu - Beşiktaş', client: 'Caner Demirdağ', type: 'Viewing', day: 23 },
    { id: 2, time: '14:30', title: 'Sözleşme İmza', client: 'Ayşe Yılmaz', type: 'Contract', day: 23 },
    { id: 3, time: '16:00', title: 'Yeni Portföy Çekimi', client: 'Mülk Sahibi', type: 'Shoot', day: 25 },
];

export const getPropertyById = (id: string) => PROPERTIES.find(p => p.id === id);
export const getLeadById = (id: string) => LEADS.find(l => l.id === id);
export const getMeetings = () => MEETINGS;
