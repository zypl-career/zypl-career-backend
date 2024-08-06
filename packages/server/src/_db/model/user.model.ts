export type UserModel = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  gender: 'male' | 'female';
  age?: number;
  district?: CitiesAndRegionsOfTajikistan;
  role: 'student' | 'teacher' | 'parents';
  school?: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};

export enum CitiesAndRegionsOfTajikistan {
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
