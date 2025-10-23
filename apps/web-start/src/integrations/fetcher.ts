import { useAuth0 } from '@auth0/auth0-react';

export function useBackendFetcher() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  async function fetchWithAuth<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = import.meta.env.VITE_BACKEND_URL + endpoint;
    const headers = new Headers(options?.headers);

    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
    return response.json() as Promise<T>;
  }

  return fetchWithAuth;
}
