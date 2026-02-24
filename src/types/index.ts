export type PropertyStatus = 'active' | 'sold' | 'pending' | 'draft';

export interface Property {
    id: string;
    title: string;
    address: string;
    price: number;
    type: 'residential' | 'commercial' | 'land';
    status: PropertyStatus;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    image: string;
    createdAt: string;
}

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'new' | 'contacted' | 'qualified' | 'lost' | 'won';
    source: string;
    interestedIn?: string; // Property ID
    createdAt: string;
    budgetMin?: number;
    budgetMax?: number;
    preferredArea?: string;
    notes?: string;
}

export interface Offer {
    id: string;
    client: string;
    property: string;
    price: number;
    date: string;
    status: 'draft' | 'sent' | 'accepted' | 'rejected';
    channel: 'whatsapp' | 'email' | null;
    leadId: string;
}
