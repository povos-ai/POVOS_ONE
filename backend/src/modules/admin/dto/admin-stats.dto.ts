export class AdminStatsDto {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  workspaces: {
    total: number;
    active: number;
  };
  opportunities: {
    total: number;
    published: number;
    draft: number;
    newThisMonth: number;
  };
  applications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  submissions: {
    total: number;
    today: number;
  };
}