export interface UnitResponse {
  current_country_id: number;
  locations: UnitLocation[];
  wp_total: number;
  total: number;
  success: boolean;
}

export interface UnitLocation {
  id: number;
  title: string;
  content?: string;
  opened?: boolean;
  mask?: Mask;
  towel?: Towel;
  fountain?: Fountain;
  locker_room?: LockerRoom;
  schedules?: Schedule[];
  street?: string;
  region?: string;
  city_name?: string;
  state_name?: string;
  uf?: string;
}

export enum Mask {
  Recommended = 'recommended',
  Required = 'required',
}

export enum Towel {
  Recommended = 'recommended',
  Required = 'required',
}

export enum Fountain {
  NotAllowed = 'not_allowed',
  Partial = 'partial',
}

export enum LockerRoom {
  Allowed = 'allowed',
  Closed = 'closed',
  Partial = 'partial',
}

export interface Schedule {
  weekdays: Weekdays;
  hour: string;
}

export enum Weekdays {
  Dom = 'Dom.',
  Obs = 'Obs.:',
  SegÀSex = 'Seg. à Sex.',
  SegÀsSex = 'Seg. às Sex.',
  Sáb = 'Sáb.',
}

export const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  },
};

export type HOUR_INDEX = 'morning' | 'afternoon' | 'night';
