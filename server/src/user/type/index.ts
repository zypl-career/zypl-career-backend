import { UserModel } from '../_db/model/index.js';

export enum EnumCities {
  Dushanbe = 'Dushanbe',
  Bokhtar = 'Bokhtar',
  Kulob = 'Kulob',
  Vahdat = 'Vahdat',
  Tursunzoda = 'Tursunzoda',
  Panjakent = 'Panjakent',
  Norak = 'Norak',
  Danghara = 'Danghara',
  Farkhor = 'Farkhor',
  Hissor = 'Hissor',
  Gafurov = 'Gafurov',
  Roghun = 'Roghun',
  Shahritus = 'Shahritus',
  Shahrinav = 'Shahrinav',
  Taboshar = 'Taboshar',
  Chkalovsk = 'Chkalovsk',
  Khorugh = 'Khorugh',
  Murghab = 'Murghab',
  Qayroqqum = 'Qayroqqum',
  Sarband = 'Sarband',
  Vose = 'Vose',
  Asht = 'Asht',
  Baljuvon = 'Baljuvon',
  Darvoz = 'Darvoz',
  Devashtich = 'Devashtich',
  Fayzobod = 'Fayzobod',
  Ishkoshim = 'Ishkoshim',
  Jabbor_Rasulov = 'Jabbor Rasulov',
  Jilikul = 'Jilikul',
  Jirgatol = 'Jirgatol',
  Khovaling = 'Khovaling',
  Kuhistoni_Mastchoh = 'Kuhistoni Mastchoh',
  Lakhsh = 'Lakhsh',
  Muminobod = 'Muminobod',
  Nurobod = 'Nurobod',
  Nosiri_Khusrav = 'Nosiri Khusrav',
  Panj = 'Panj',
  Rasht = 'Rasht',
  Roshtqala = 'Roshtqala',
  Rumi = 'Rumi',
  Rudaki = 'Rudaki',
  Rushon = 'Rushon',
  Sangvor = 'Sangvor',
  Shughnon = 'Shughnon',
  Temurmalik = 'Temurmalik',
  Tojikobod = 'Tojikobod',
  Varzob = 'Varzob',
  Vakhsh = 'Vakhsh',
  Vanj = 'Vanj',
  Zafar = 'Zafar',
  Zarafshon = 'Zarafshon',
  Yovon = 'Yovon',
  Dusti = 'Dusti',
  Khuroson = 'Khuroson',
  Kushoniyon = 'Kushoniyon',
  Levakant = 'Levakant',
  Qubodiyon = 'Qubodiyon',
  Balkhi = 'Balkhi',
  Khujand = 'Khujand',
  Buston = 'Buston',
  Ghafurov = 'Ghafurov',
  Isfara = 'Isfara',
  Istaravshan = 'Istaravshan',
  Konibodom = 'Konibodom',
  Mastchoh = 'Mastchoh',
  Spitamen = 'Spitamen',
  Zafarobod = 'Zafarobod',
  Rasulov = 'Rasulov',
  Shahriston = 'Shahriston',
  Ayni = 'Ayni',
  Penjikent = 'Penjikent',
}

export enum EnumGenders {
  male = 'male',
  female = 'female',
}

export enum EnumRoles {
  student = 'student',
  teacher = 'teacher',
  parents = 'parent',
  admin = 'admin',
}

export interface IUserLoginDataDTO {
  email: string;
  password: string;
}

export interface IUserCreateDataDTO {
  name: string;
  surname: string;
  patronymic?: string;
  gender: TGender;
  age?: number;
  district?: EnumCities;
  role: TRole;
  school?: string;
  email: string;
  password: string;
}

export interface IUserUpdateDataDTO {
  name?: string;
  surname?: string;
  patronymic?: string;
  gender?: TGender;
  age?: number;
  district?: EnumCities;
  role?: TRole;
  school?: string;
  email?: string;
  password?: string;
}

export type TGender = 'male' | 'female';

export type TRole = 'student' | 'teacher' | 'parents' | 'admin';

export interface IUserLoginResult {
  access: string;
  refresh: string;
}

export interface PaginationResult<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PaginatedUserResponse {
  total: number;
  page: number;
  limit: number;
  data: UserModel[];
}
