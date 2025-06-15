import { render, screen, fireEvent, act } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import {urlsReducer} from "../src/features/url/model/urlSlice";
import {ShortenUrlWidget, UrlsListWidget} from "../src/widgets";

const mockUrl = {
  id: "test-id",
  shortCode: "abc123",
  originalUrl: "https://google.com",
  createdAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 86400000).toISOString(),
  clicks: [],
  user: {
    id: "user-1",
    name: "Test User"
  }
};

// Мокаем Redux thunk
jest.mock("../src/features/url/model/urlThunk", () => ({
  createUrlThunk: () => async (dispatch: any) => {
    dispatch({ type: "url/create/pending" });
    dispatch({
      type: "url/create/fulfilled",
      payload: mockUrl
    });
    return mockUrl;
  },
    loadUrlByShorCodeThunk: {
        pending: { type: 'url/loadByShortCode/pending' },
        fulfilled: { type: 'url/loadByShortCode/fulfilled' },
        rejected: { type: 'url/loadByShortCode/rejected' },
        // Сам thunk
        // @ts-ignore - игнорируем типы для простоты
        async: () => async (dispatch: any) => {
            dispatch({ type: "url/loadByShortCode/pending" });
            dispatch({
                type: "url/loadByShortCode/fulfilled",
                payload: mockUrl
            });
        }
    },

    loadUserUrls: () => async (dispatch: any) => {
      dispatch({ type: "url/loadByShortCode/pending" });
      dispatch({
        type: "url/loadByShortCode/fulfilled",
        payload: mockUrl
      });
    }

}));

export const mockUrlResponse = {
    id: "test-id",
    shortCode: "abc123",
    originalUrl: "https://google.com",
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    clicks: [],
    user: {
        id: "user-1",
        name: "Test User"
    }
};

jest.mock('../src/features/url/api/urlApi', () => ({
    createUrl: jest.fn().mockResolvedValue(mockUrlResponse),
    getUrlByShortCode: jest.fn().mockResolvedValue(mockUrlResponse),
    getUserUrls: jest.fn().mockResolvedValue([mockUrlResponse]),
    fetchUserUrls: jest.fn().mockResolvedValue([mockUrlResponse]),
}));

describe("ShortenUrl", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        urls: urlsReducer
      },
      preloadedState: {
        urls: {
          items: [],
          isLoading: false,
          error: null
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Отправляет форму с URL", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
              <ShortenUrlWidget />
              <UrlsListWidget />
          </Provider>
        </MemoryRouter>
      );
    });

    const input = screen.getByPlaceholderText(/Вставьте длинную ссылку/i);
    const button = screen.getByRole("button", { name: /сократить/i });

    await act(async () => {
      fireEvent.change(input, { target: { value: "https://google.com" } });
    });

    await act(async () => {
      fireEvent.click(button);
    });

    // Ждем завершения всех асинхронных операций
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

      expect(screen.getByText(/https:\/\/google\.com/i)).not.toBeNull();
  });
});