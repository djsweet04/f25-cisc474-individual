import { useAuth0 } from '@auth0/auth0-react';

export function useBackendFetcher(){
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  async function fetchWithAuth<T>(endpoint: string): Promise<T> {
    const url = import.meta.env.VITE_BACKEND_URL + endpoint;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        headers['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.warn('Failed to retrieve access token', err);
      }
    }

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

    return response.json() as Promise<T>;
  }

  return fetchWithAuth;
}
