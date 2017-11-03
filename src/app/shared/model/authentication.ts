export class Authentication {
  authorities: Authorities[];
  details: string;
  authenticated: boolean;
  principal: string;
  credentials: string;
  name: string;
}

export class Authorities {
  authority: string;
}
