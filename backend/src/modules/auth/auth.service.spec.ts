import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('test-token'),
            sign: jest.fn().mockReturnValue('test-token'),
            verify: jest.fn().mockReturnValue({ sub: '1', email: 'test@example.com' }), // ✅ Add verify
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const mockuser = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'APPLICANT',
        firstName: 'Test',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockuser);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result.accessToken).toBe('test-token');
    });

    it('should throw error if user not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(
        service.login({
          email: 'wrong@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow();
    });
  });
});