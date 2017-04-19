export interface Job {
  id: number;
  status: string;
  stage: string;
  name: string;
  created_at: Date;
  started_at: Date;
  finished_at: Date;
  user: {
    name: string;
    avatar_url: string;
  };
  runner: {
    id: string,
    description: string
  };
  artifacts_file: {
    filename: string;
    size: number;
  };
}
