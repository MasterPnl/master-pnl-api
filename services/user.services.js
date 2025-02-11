const UserRepository = require("../repositories/user.repository");
const bcrypt = require('bcryptjs');

class UserServices {
  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    return await UserRepository.findById(id);
  }

  async getUserByUsername(username) {
    return await UserRepository.findByUsername(username);
  }

  async createUser(data, isAdmin = 0) {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = {
      username: data.username,
      password: hashedPassword,
      isAdmin: isAdmin,
    }
    return await UserRepository.create(user);
  }

  async updateUser(id, data) {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = {
      username: data.username,
      password: hashedPassword,
    }
    const updatedUser = await UserRepository.update(id, user);
    return {
      id: updatedUser.id,
      username: updatedUser.username,
    };
  }

  async deleteUser(id) {
    return await UserRepository.delete(id);
  }
}

module.exports = new UserServices();
