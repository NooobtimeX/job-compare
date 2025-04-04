export type Job = {
  id: string;
  company?: CompanyInfo;
  position?: PositionInfo;
  workCondition?: WorkCondition;
};

export type CompanyInfo = {
  name: string;
  size?: string;
  city?: string;
  relocationSupport?: boolean;
};

export type PositionInfo = {
  title: string;
  baseSalary: number;
  bonus?: number;
  stockOptions?: boolean;
  vacationDays?: number;
  insurance?: string[];
};

export type WorkCondition = {
  workHours?: string;
  remoteOption?: boolean;
  overtime?: boolean;
  flexibleHours?: boolean;
};
