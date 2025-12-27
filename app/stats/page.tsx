import { redirect } from 'next/navigation';

// Redirect /stats to /stats/introduction
export default function StatsIndexPage() {
  redirect('/stats/introduction');
}


