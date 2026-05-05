const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Fix 1: credentials:'include' envía la cookie httpOnly automáticamente en cada petición
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Error ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Fix 1: login ya no devuelve token — el servidor lo guarda en cookie httpOnly
  login: (email: string, password: string) =>
    request<{ ok: boolean }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Fix 1: verifica si la sesión sigue activa (cookie válida)
  me: () => request<{ ok: boolean }>("/api/auth/me"),

  // Fix 1: logout limpia la cookie en el servidor
  logout: () => request<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),

  getCourses: () => request<any[]>("/api/courses/all"),

  getCourse: (slug: string) => request<any>(`/api/courses/${slug}`),

  createCourse: (data: any) =>
    request<{ id: number }>("/api/courses", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateCourse: (id: number, data: any) =>
    request<{ ok: boolean }>(`/api/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteCourse: (id: number) =>
    request<{ ok: boolean }>(`/api/courses/${id}`, { method: "DELETE" }),

  getDeletedCourses: () => request<any[]>("/api/courses/deleted"),

  restoreCourse: (id: number) =>
    request<{ ok: boolean }>(`/api/courses/${id}/restore`, { method: "PUT" }),

  permanentDeleteCourse: (id: number) =>
    request<{ ok: boolean }>(`/api/courses/${id}/permanent`, { method: "DELETE" }),

  getCategories: () => request<any[]>("/api/categories"),

  createCategory: (data: any) =>
    request<{ id: number }>("/api/categories", { method: "POST", body: JSON.stringify(data) }),

  updateCategory: (id: number, data: any) =>
    request<{ ok: boolean }>(`/api/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  deleteCategory: (id: number) =>
    request<{ ok: boolean }>(`/api/categories/${id}`, { method: "DELETE" }),

  getDeletedCategories: () => request<any[]>("/api/categories/deleted"),

  restoreCategory: (id: number) =>
    request<{ ok: boolean }>(`/api/categories/${id}/restore`, { method: "PUT" }),

  permanentDeleteCategory: (id: number) =>
    request<{ ok: boolean }>(`/api/categories/${id}/permanent`, { method: "DELETE" }),

  getUsers: () => request<any[]>("/api/users"),

  createUser: (username: string, password: string) =>
    request<{ id: number }>("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  toggleUser: (id: number) =>
    request<{ ok: boolean; active: boolean }>(`/api/users/${id}/toggle`, { method: "PATCH" }),

  changeUserPassword: (id: number, password: string) =>
    request<{ ok: boolean }>(`/api/users/${id}/password`, {
      method: "PATCH",
      body: JSON.stringify({ password }),
    }),

  deleteUser: (id: number) =>
    request<{ ok: boolean }>(`/api/users/${id}`, { method: "DELETE" }),

  getStatus: () => request<any>("/api/status"),

  getOutages: () => request<any[]>("/api/status/outages"),

  logOutage: (detected_at: string, resolved_at: string, duration_s: number) =>
    request<{ ok: boolean }>("/api/status/outages", {
      method: "POST",
      body: JSON.stringify({ detected_at, resolved_at, duration_s }),
    }),
};

// Exportado para useCourses e ImageUpload (evita duplicar la constante)
export const API_BASE = BASE;
