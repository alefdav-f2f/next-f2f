export interface Site {
  id: number;
  name: string;
  url: string;
  token: string;
  created_at: string;
  updated_at: string;
}

export interface SiteFormData {
  name: string;
  url: string;
  token: string;
}

export interface VersionItem {
  component_type: 'plugin' | 'theme' | 'wordpress' | 'php';
  component_slug: string;
  current_version: string;
  latest_version: string;
  is_outdated: boolean | number;
  last_checked: string;
  details: string;
}

export interface ActivityItem {
  id: number;
  user_id: number;
  user_login: string;
  action: string;
  object_type: string;
  object_name: string;
  details: string;
  ip_address: string | null;
  created_at: string;
}

export interface QueueStatusItem {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  count: number;
}

export interface SiteSummary {
  id: number;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'error';
  outdatedCount: number;
  activityTodayCount: number;
  queuePendingCount: number;
}

export interface PaginationInfo {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ActivityResponse {
  data: ActivityItem[];
  total: number;
  totalPages: number;
}
