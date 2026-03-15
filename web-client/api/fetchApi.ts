type ApiResult<T> = { data: T; error: null } | { data: null; error: string };

export async function fetchApi<T>(url: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, init);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const message = body?.error?.message ?? `HTTP ${res.status} ${res.statusText}`;
      console.error(`[fetchApi] ${url}: ${message}`);
      return { data: null, error: message };
    }

    const json = await res.json();
    return { data: json.data as T, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown network error';
    console.error(`[fetchApi] ${url}: ${message}`);
    return { data: null, error: message };
  }
}
