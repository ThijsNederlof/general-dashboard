export interface Project {
  id: number;
  name_with_namespace: string;
  created_at: Date;
  last_activity_at: Date;
  http_url_to_repo: string;
}
