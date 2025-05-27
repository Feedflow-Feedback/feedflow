import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../typeorm/entities/user';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findUserByEMail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }
  async findUserByUserId(userId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { userId } });
  }
  async findUserByEMailwithPassword(email: string): Promise<User | null> {
    return await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async createUser(data: CreateUserDto): Promise<Partial<User>> {
    const user = this.userRepo.create(data);
    await this.userRepo.save(user);
    const returnUser = { userId: user.userId, email: user.email };
    return returnUser;
  }
}
