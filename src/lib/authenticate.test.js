import { authenticate } from './authenticate';
import { API_URL, mockToken } from '../constants';

// Mock global fetch
global.fetch = jest.fn();

describe('authenticate function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('calls API with correct parameters', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                meta: { token: 'test-token' }
            })
        };

        global.fetch.mockResolvedValue(mockResponse);

        const loginData = {
            username: 'user1',
            password: 'password1'
        };

        await authenticate(loginData);

        // Check if fetch was called with correct parameters
        expect(global.fetch).toHaveBeenCalledWith(
            `${API_URL}/authenticate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/vnd.api+json'
                },
                body: JSON.stringify({
                    data: {
                        type: 'login',
                        attributes: {
                            username: 'user1',
                            password: 'password1'
                        }
                    }
                })
            }
        );
    });

    test('returns response data on successful authentication', async () => {
        // Mock response data
        const mockResponseData = {
            meta: { token: mockToken },
            data: { id: '123', type: 'user' }
        };

        // Setup mock response
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponseData)
        };

        global.fetch.mockResolvedValue(mockResponse);

        const result = await authenticate({ username: 'user1', password: 'password1' });

        expect(result).toEqual(mockResponseData);
        expect(mockResponse.json).toHaveBeenCalled();
    });
});