const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

export const apiUrl = (path: string) => {
  if (!API_BASE) {
    return path;
  }
  return `${API_BASE}${path}`;
};
