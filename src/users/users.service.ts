import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { UserEntity } from 'src/users/entities/user.entity'
import { ResponseAllUser } from './interfaces/response-user.interface';
import { UserReturn } from './interfaces/user.password';
@Injectable()
export class UsersService {
  private users: UserEntity[] = [
    { id: 1, name: 'user1', age:8, photo:'jugo', email:'joseluisgonzales@gmail', password:'numero', role:'admin', gender:'male', isActive: true },
    { id: 2, name: 'user2', age:8, photo:'jugo', email:'petra@gmail', password:'numero', role:'user', gender:'male', isActive: true },
    { id: 3, name: 'user3', age:8, photo:'jugo', email:'roswinros@gmail', password:'numero', role:'admin', gender:'male', isActive: true },
    { id: 4, name: 'user4', age:8, photo:'jugo', email:'jose@gmail', password:'numero', role:'user', gender:'female', isActive: true },
    { id: 5, name: 'user5', age:8, photo:'jugo', email:'luisss@gmail', password:'numero', role:'admin', gender:'female', isActive: true },
    
  ]
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = {
      ...createUserDto,
      id: this.users.length,
      isActive: true,
    }
    try {
      this.users.push(user);

      return user ;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
  

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllUser> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      if (this.users.length === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Users not found!',
        });
      }

      const total = this.users.filter((user) => user.isActive === true).length;
      const lastPage = Math.ceil(total / limit);
      let data = this.users.filter((user) => user.isActive === true).slice(skip, limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data
        
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: number): Promise<UserReturn> {
    try {
      const user = this.users.find((user) => user.id === id && user.isActive === true);
      if (!user) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "User not found",
        })
      }
      const {password, ...rest} = user;

      return rest;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
