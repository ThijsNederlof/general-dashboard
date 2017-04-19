export interface Deployment {
  id: number;
  sha: string;
  environment: {
    id: number,
    name: string;
    external_url: string;
  };
  deployable: {
    status: string;
    finished_at: Date;
    user: {
      name: string;
      avatar_url: string;
    };
    commit: {
      title: string;
    };
  };

}
