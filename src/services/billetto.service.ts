import type { BillettoEvent } from '@/types/billetto';

export async function getUpcomingEvents(limit = 3) {
  const api_limit = 20;
  const res = await fetch(
    `/api/billetto?endpoint=organiser/events&state=published&limit=${api_limit}&expand=data.gallery_items`,
  );

  if (!res.ok) {
    throw new Error('Billetto proxy error for upcoming events');
  }

  const json = await res.json();
  return (json.data ?? [])
    .filter((event: BillettoEvent) => !!event.published_at)
    .sort(
      (a: BillettoEvent, b: BillettoEvent) =>
        new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
    )
    .slice(0, limit);
}

export async function getTicketTypesForAccount() {
  const api_limit = 20;
  const res = await fetch(
    `/api/billetto?endpoint=organiser/ticket_types&limit=${api_limit}`,
  );
  if (!res.ok) {
    throw new Error('Billetto proxy error for ticket types');
  }

  const json = await res.json();
  return json.data ?? [];
}

export async function getPreviousEvents(limit = 20) {
  const url = `/api/billetto?endpoint=organiser/events&category=music&starts_before=${new Date().toISOString()}&limit=${limit}&expand=data.gallery_items`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Billetto proxy error for previous events');
  }

  const json = await res.json();
  return (json.data ?? [])
    .filter((event: BillettoEvent) => !!event.published_at)
    .sort(
      (a: BillettoEvent, b: BillettoEvent) =>
        new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime(),
    )
    .slice(0, limit);
}

export async function getEventById(eventId: string) {
  const endpoint = `organiser/events/${eventId}`;
  const expand = encodeURIComponent('gallery_items,editorial'); // encode the value only
  const res = await fetch(
    `/api/billetto?endpoint=${endpoint}&expand=${expand}`,
  );

  if (!res.ok) throw new Error('Billetto proxy error');
  return (await res.json()) as BillettoEvent;
}
