import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useSession } from '../contexts/AuthContext';
import { Seasons } from '../typings';
import { query } from '../utils/query';

export const useSeason = (): {
  season: number;
  startDate: string;
  ended: boolean;
  loading: boolean;
} => {
  const { session, loggedIn } = useSession();

  const { data: seasonData, isLoading: isLoadingSeason } = useQuery<Seasons>({
    queryKey: ['currentSeason', session?.token],
    queryFn: () =>
      query(`api/v1/season`, {
        headers: {},
      }),
    enabled: loggedIn,
  });

  const currentSeason = useMemo(() => seasonData, [seasonData]);

  return useMemo(
    () => ({
      loading: isLoadingSeason,
      season: currentSeason?.season ?? 0,
      startDate: currentSeason?.startDate ?? '',
      ended: Boolean(currentSeason?.ended),
    }),
    [currentSeason, isLoadingSeason],
  );
};
