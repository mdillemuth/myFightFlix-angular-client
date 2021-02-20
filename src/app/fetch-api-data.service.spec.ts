import { TestBed } from '@angular/core/testing';
import {
  UserRegistrationService,
  UserLoginService,
  GetUserService,
  EditUserService,
  DeleteUserService,
  AddFavoriteMovieService,
  RemoveFavoriteMovieService,
  GetMoviesService,
  GetMovieByTitleService,
  GetDirectorService,
  GetGenreService,
} from './fetch-api-data.service';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('UserLoginService', () => {
  let service: UserLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('GetUserService', () => {
  let service: GetUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('EditUserService', () => {
  let service: EditUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('DeleteUserService', () => {
  let service: DeleteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('AddFavoriteMovieService', () => {
  let service: AddFavoriteMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFavoriteMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('RemoveFavoriteMovieService', () => {
  let service: RemoveFavoriteMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveFavoriteMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('GetMoviesService', () => {
  let service: GetMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('GetMovieByTitleService', () => {
  let service: GetMovieByTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMovieByTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('GetDirectorService', () => {
  let service: GetDirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDirectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('GetGenreService', () => {
  let service: GetGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
