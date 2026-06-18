export class UserService {
  async findUserById(id: string) {
    // Mock database operation
    return {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
    };
  }

  async findUserByEmail(email: string) {
    // Mock database operation
    if (email === 'john@example.com') {
      return {
        id: '123',
        name: 'John Doe',
        email,
        passwordHash: '$2a$10$XyZ...mockHashedPassword', // Sample bcrypt hash
      };
    }
    return null;
  }

  async createUser(userData: { name: string; email: string; passwordHash: string }) {
    // Mock database operation
    return {
      id: Math.random().toString(36).substring(7),
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    };
  }
}

export const userService = new UserService();
export default userService;
