// /services/billetto.service.ts
import type { BillettoEvent } from "@/types/billetto";

const API_BASE = "https://billetto.dk/api/v3";
const API_KEY = import.meta.env.VITE_BILLETTO_API_KEYPAIR;

export async function getUpcomingEvents(limit = 3): Promise<BillettoEvent[]> {
    const url = `${API_BASE}/organiser/events?expand=data.editorial,data.gallery_items`;

    const res = await fetch(url, {
        headers: {
            accept: "application/json",
            "Api-Keypair": API_KEY,
        },
    });

    if (!res.ok) {
        throw new Error(`Billetto fetch failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const events: BillettoEvent[] = json.data ?? [];

    return events.slice(0, limit);
}

export async function getPreviousEvents(limit = 20): Promise<BillettoEvent[]> {
    const url = `${API_BASE}/organiser/events?expand=data.editorial,data.gallery_items&category=music&starts_before=${new Date().toISOString()}`;

    const res = await fetch(url, {
        headers: {
            accept: "application/json",
            "Api-Keypair": API_KEY,
        },
    });

    if (!res.ok) {
        throw new Error(`Billetto fetch failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const events: BillettoEvent[] = (json.data ?? []).filter(event => !!event.published_at);
    return events.slice(0, limit);
}
