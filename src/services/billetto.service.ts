import type { BillettoEvent } from "@/types/billetto";

export async function getUpcomingEvents(limit = 3) {
    const res = await fetch(`/api/billetto?endpoint=organiser/events&limit=${limit}&expand=data.gallery_items,data.editorial`);

    if (!res.ok) {
        throw new Error("Billetto proxy error");
    }

    const json = await res.json();
    return (json.data ?? [])
        .filter((event: BillettoEvent) => !!event.published_at)
        .slice(0, limit);
}

export async function getPreviousEvents(limit = 20) {
    const url = `/api/billetto?endpoint=organiser/events&category=music&starts_before=${new Date().toISOString()}&limit=${limit}&expand=data.gallery_items,data.editorial`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Billetto proxy error");
    }

    const json = await res.json();
    return (json.data ?? [])
        .filter((event: BillettoEvent) => !!event.published_at)
        .slice(0, limit);
}
