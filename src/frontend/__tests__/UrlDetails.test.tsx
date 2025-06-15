import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import {urlsReducer} from "../src/features/url/model/urlSlice";
import {analyticsReducer} from "../src/features/features/link-analytics/model/analyticsSlice";
import {UrlDetails} from "../src/features/url/ui/UrlDetails";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ shortCode: 'someShortCode' }),
}));

const now = new Date();

test('Показывает оригинальный URL', () => {
  const store = configureStore({
    reducer: {
      urls: urlsReducer,
      analytics: analyticsReducer,
    },
    preloadedState: {
      urls: {
        items: [
          {
            id: 'test-id-1',
            shortCode: 'someShortCode',
            originalUrl: 'https://yandex.ru',
            createdAt: now.toISOString(),
            expiresAt: new Date(now.getTime() + 86400000).toISOString(),
            clicks: [],
            user: { id: 'u1', name: 'User' },
          },
        ],
        isLoading: false,
        error: null,
      },
      analytics: {
        data: { clicks: 0, lastVisitors: [] },
        isLoading: false,
        error: null,
      },
    },
  });

  render(
    <Provider store={store}>
      <UrlDetails />
    </Provider>
  );

  expect(screen.getByText(/https:\/\/yandex\.ru/i)).not.toBeNull();
});