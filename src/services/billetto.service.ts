import type { BillettoTicketType } from '@/types/billetto';

export async function getTicketTypesForAccount() {
  const api_limit = 20;
  const res = await fetch(
    `/api/billetto?endpoint=organiser/ticket_types&limit=${api_limit}`,
  );
  if (!res.ok) {
    throw new Error('Billetto proxy error for ticket types');
  }

  const json = await res.json();
  return (json.data ?? []) as BillettoTicketType[];
}
