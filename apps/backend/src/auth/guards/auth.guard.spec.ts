import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockJwtService: Partial<JwtService>;

  beforeEach(() => {
    mockJwtService = {
      verify: jest.fn(),
    };
    authGuard = new AuthGuard(mockJwtService as JwtService);
    jest.clearAllMocks();
  });

  const mockExecutionContext = (authHeader?: string): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: authHeader ? { authorization: authHeader } : {},
        }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should allow access with a valid token', async () => {
    const tokenPayload = { userId: '123', email: 'test@example.com' };
    (mockJwtService.verify as jest.Mock).mockResolvedValue(tokenPayload);

    const context = mockExecutionContext('Bearer valid.token');
    const result = await authGuard.canActivate(context);

    expect(result).toBe(true);
    expect(mockJwtService.verify).toHaveBeenCalledWith('valid.token');
  });

  it('should throw if token is missing', async () => {
    const context = mockExecutionContext(); // No auth header

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(mockJwtService.verify).not.toHaveBeenCalled();
  });

  it('should throw if token is invalid', async () => {
    (mockJwtService.verify as jest.Mock).mockRejectedValue(
      new Error('Invalid token'),
    );
    const context = mockExecutionContext('Bearer invalid.token');

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      'Invalid token',
    );
    expect(mockJwtService.verify).toHaveBeenCalledWith('invalid.token');
  });
});
