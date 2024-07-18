export interface UnitResponse {
  current_country_id: number;
  locations: Location[];
  wp_total: number;
  total: number;
  success: boolean;
}

export interface Location {
  id: number;
  title: string;
  content?: string;
  opened?: boolean;
  mask?: Mask;
  towel?: Mask;
  fountain?: Fountain;
  locker_room?: LockerRoom;
  schedules?: Schedule[];
  street?: string;
  region?: string;
  city_name?: string;
  state_name?: string;
  uf?: string;
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

export enum Mask {
  Recommended = 'recommended',
  Required = 'required',
}

export interface Schedule {
  weekdays: Weekdays;
  hour: string;
}

export enum Weekdays {
  DOM = 'Dom.',
  Obs = 'Obs.:',
  SegÀSex = 'Seg. à Sex.',
  SegÀsSex = 'Seg. às Sex.',
  Sáb = 'Sáb.',
}
