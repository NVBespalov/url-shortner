import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from './analyticsSlice';
import { fetchStatistic } from '../api/statisticApi';

export const fetchAnalyticsThunk = createAsyncThunk(
  'analytics/fetch',
  async (shortCode: string, { dispatch }) => {
    dispatch(setLoading(true));
    const analytics = fetchStatistic(shortCode);
    dispatch(setLoading(false));
    return analytics;
  },
);
