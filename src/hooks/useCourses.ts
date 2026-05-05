import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CourseData } from "@/data/courses";
import { courses as staticCourses } from "@/data/courses";
import { API_BASE as API } from "@/lib/api";

const SLUG_TO_LABEL: Record<string, string> = {
  criminologia:             "Criminologia",
  "dret-penal":             "Dret Penal",
  "transit-i-circulacio":   "Trànsit i Circulació",
  ciberseguretat:           "Ciberseguretat",
  "procediments-policials": "Procediments Policials",
  "seguretat-ciutadana":    "Seguretat Ciutadana",
  criminalistica:           "Criminalística",
  "altres-tematiques":      "Altres Temàtiques",
  "actic-i-angles":         "ACTIC i Anglès",
};

export function resolveImg(url: string | null | undefined): string {
  if (!url) return "";
  return url.startsWith("/uploads/") ? `${API}${url}` : url;
}

function parseJson(val: any): any {
  if (Array.isArray(val) || (val && typeof val === "object")) return val;
  if (typeof val === "string") { try { return JSON.parse(val); } catch { return []; } }
  return [];
}

function apiToCourse(c: any): CourseData {
  const catLabel = SLUG_TO_LABEL[c.categoria_slug] ?? c.categoria_slug ?? "";
  return {
    slug: c.slug,
    categoriaSlug: c.categoria_slug ?? "",
    categoriaLabel: catLabel,
    sidebarCategoryLabel: catLabel,
    titleBase: c.title_ca ?? "",
    titleEs: c.title_es || undefined,
    img: resolveImg(c.img),
    gridImg: resolveImg(c.grid_img),
    price: Number(c.price) || 0,
    originalPrice: c.original_price != null ? Number(c.original_price) : null,
    gridHours: c.grid_hours ?? undefined,
    gridStartDate: c.grid_start_date ?? undefined,
    gridEndDate: c.grid_end_date ?? undefined,
    isNew: Boolean(c.is_new),
    comingSoon: Boolean(c.coming_soon),
    enrollmentUrl: c.enrollment_url ?? undefined,
    modules: parseJson(c.modules_ca),
    modulesEs: parseJson(c.modules_es),
    plansCa: parseJson(c.plans_ca),
    plansEs: parseJson(c.plans_es),
    plans: parseJson(c.plans_ca),
    faq: parseJson(c.faq_ca),
    faqEs: parseJson(c.faq_es),
    heroStats: parseJson(c.hero_stats),
    metaItems: parseJson(c.meta_items),
    audience: parseJson(c.audience_ca),
    audienceEs: parseJson(c.audience_es),
  };
}

async function fetchCourses(): Promise<CourseData[]> {
  const res = await fetch(`${API}/api/courses`, { signal: AbortSignal.timeout(4000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: any[] = await res.json();
  return data.map(apiToCourse);
}

export function useCourses(): { courses: CourseData[]; isLoading: boolean; usingFallback: boolean } {
  const { data, isFetching, isError } = useQuery<CourseData[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      try { return await fetchCourses(); }
      catch {
        toast.warning("No s'ha pogut connectar amb el servidor. Es mostren dades en memòria cau.", {
          id: "fallback-warning",
          duration: 6000,
        });
        return staticCourses;
      }
    },
    initialData: staticCourses,
    staleTime: 0,
    retry: false,
  });
  return { courses: data, isLoading: isFetching, usingFallback: isError };
}

async function fetchCourseBySlug(slug: string): Promise<CourseData | null> {
  const res = await fetch(`${API}/api/courses/${encodeURIComponent(slug)}`, {
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) return null;
  return apiToCourse(await res.json());
}

export function useCourse(slug: string | undefined): { course: CourseData | undefined; isLoading: boolean } {
  const { data, isFetching } = useQuery<CourseData | null>({
    queryKey: ["course", slug],
    queryFn: () => slug ? fetchCourseBySlug(slug) : Promise.resolve(null),
    enabled: !!slug,
    staleTime: 60_000,
    retry: false,
  });
  return { course: data ?? undefined, isLoading: isFetching };
}
