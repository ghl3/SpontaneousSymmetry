import { redirect } from 'next/navigation';

// Redirect /stats to /stats/introduction
export default function StatsIndexPage(): never {
  redirect('/stats/introduction');
}
