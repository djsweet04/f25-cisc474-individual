import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';

export function useBackendFetcher() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  
  async function fetchWithAuth<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = import.meta.env.VITE_BACKEND_URL + endpoint;
    const headers: Record<string, string> ={
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string>),
    };

    if (isAuthenticated) {
      try{
        const token = await getAccessTokenSilently({
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        } as GetTokenSilentlyOptions);
        console.log('🔑 Access token:', token);
        headers['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
    return response.json() as Promise<T>;

    if(response.status === 204)
    return null as T;
  }

  return fetchWithAuth;
}
