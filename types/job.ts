export type Job = {
  id: string;
  company?: CompanyInfo;
  position?: PositionInfo;
  workCondition?: WorkCondition;
  benefits?: Benefits;
};

export type CompanyInfo = {
  name: string;
  size?: string;
  city?: string;
};

export type PositionInfo = {
  title: string;
  baseSalary: number;
  bonus?: number;
};

export type WorkCondition = {
  workHours?: string;
  remoteOption?: boolean;
  overtime?: boolean;
  flexibleHours?: boolean;
};

export type Benefits = {
  relocationSupport?: boolean;
  insurance?: string[];
  stockOptions?: boolean;
  vacationDays?: number;
};
