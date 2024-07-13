import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async createUser(@Body() userDto: UserDto) {
        return await this.userService.createUser(userDto);
    }

    @Get()
    async getUserByFriendCode(@Body() userDto: UserDto) {
        return await this.userService.getUserByFriendCode(userDto);
    }

    @Patch()
    async updateUser(@Body() userDto: UserDto) {
        return await this.userService.updateUser(userDto);
    }

    @Delete()
    async deleteUser(@Body() userDto: UserDto) {
        return await this.userService.deleteUser(userDto);
    }
}
