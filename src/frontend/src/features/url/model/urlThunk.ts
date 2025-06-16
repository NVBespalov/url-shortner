import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUrls, setLoading, setError } from './urlSlice';
import { fetchUserUrls } from '../api/urlApi';
import { authApi } from '../../../shared/api';
import type { Url } from './types';
import { getRedirectUrl } from '../../../shared/utils/url';

export const loadUserUrls = createAsyncThunk('urls/loadUserUrls', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const urls = await fetchUserUrls();
    dispatch(setUrls(urls));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Failed to load urls'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});
export const loadUrlByShorCodeThunk = createAsyncThunk(
  'url/loadByShortCode',
  async (shortCode: string) => {
    const response = await authApi.get(`/url/${shortCode}`);
    return response.data;
  },
);

export const createUrlThunk = createAsyncThunk('url/create', async (url: string, { dispatch }) => {
  const res = await authApi.post<Url>('/url', { originalUrl: url });
  dispatch(loadUserUrls());
  return res.data;
});

export const deleteUrlThunk = createAsyncThunk('url/delete', async (id: string, { dispatch }) => {
  await authApi.delete(`/url/${id}`);
  dispatch(loadUserUrls());
  return id;
});

export const openShortUrl = (shortCode: string): void => {
  window.open(getRedirectUrl(shortCode), '_blank');
};
