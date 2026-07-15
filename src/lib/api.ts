import { authClient } from "./auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getAuthToken() {
  const { data: session } = await authClient.getSession();
  return session?.session?.token || null;
}

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = await getAuthToken();

  const { headers: customHeaders, ...restOptions } = options;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...restOptions });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function get(
  endpoint: string,
  params: Record<string, unknown> = {},
) {
  const cleanParams = Object.fromEntries(
    Object.entries(params)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      )
      .map(([, value]) => [String(value), String(value)]),
  );

  const queryString = new URLSearchParams(
    cleanParams as Record<string, string>,
  ).toString();
  return fetchAPI(queryString ? `${endpoint}?${queryString}` : endpoint);
}

export async function post(endpoint: string, data: unknown) {
  return fetchAPI(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function patch(endpoint: string, data: unknown) {
  return fetchAPI(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function del(endpoint: string, data: unknown) {
  return fetchAPI(endpoint, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
}

// Campaign-specific API functions

export async function getCampaigns(query?: string) {
  return get(`/api/campaigns?${query}`);
}

export async function getFeaturedCampaigns() {
  return get("/api/campaigns/featured");
}

export async function getCampaignsByCreator(creatorEmail: string) {
  return get(`/api/campaigns/creator/${creatorEmail}`);
}

export async function getCampaignById(id: string) {
  return get(`/api/campaigns/${id}`);
}

export async function createCampaign(data: {
  title: string;
  description: string;
  image?: string;
  category?: string;
  raised?: number;
  goal?: number;
  deadline?: string;
  organizer?: string;
  minContribution?: number;
  status: string;
  creatorEmail: string;
  rewards?: string;
  story?: string;
  featured?: boolean;
}) {
  return post("/api/campaigns", data);
}

export async function updateCampaign(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    image: string;
    category: string;
    raised: number;
    goal: number;
    deadline: string;
    organizer: string;
    minContribution: number;
    status: string;
    rewards: string;
    story: string;
    featured: boolean;
  }>,
) {
  return patch(`/api/campaigns/${id}`, data);
}

export async function deleteCampaign(id: string) {
  return del(`/api/campaigns/${id}`, {});
}
