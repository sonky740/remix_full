import { data, redirect } from 'react-router';
import { DateTime } from 'luxon';
import type { Route } from './+types/leaderboards-redirection-page';

export function loader({ params }: Route.LoaderArgs) {
  const { period } = params;
  let url: string = '';
  const today = DateTime.now().setZone('Asia/Seoul');

  const periodBranches = {
    daily: () => {
      url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
    },
    weekly: () => {
      url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
    },
    monthly: () => {
      url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
    },
    yearly: () => {
      url = `/products/leaderboards/yearly/${today.year}`;
    },
  };

  periodBranches[period as keyof typeof periodBranches]();

  if (!url) {
    return data(null, { status: 400 });
  }

  return redirect(url);
}
