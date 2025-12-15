import { IServices } from 'soap';
import { SoapCallbackFunction } from '../types/soap-callback-function.type';
import { login } from '../../services/auth.service';

export const authService: IServices = {
  AuthService: {
    AuthServicePort: {
      Login: async function (
        { email, password }: { email: string; password: string;},
        callback: SoapCallbackFunction
      ) {
        try {
          const jwtToken = await login(email, password);
          return !!callback && callback({ jwtToken });
        } catch (error) {
          console.error('Login error:', error);
          return (
            !!callback &&
            callback({
              Fault: {
                faultcode: 'soap:Client',
                faultstring: 'Authentication failed',
                detail: {
                  code: 401,
                  message: error instanceof Error ? error.message : 'Invalid credentials',
                },
              },
            })
          );
        }
      }
    },
  },
};