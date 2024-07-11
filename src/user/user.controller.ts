import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/create-User.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async createUser(@Body() createUserDto: createUserDto) {
        return await this.userService.createUser(createUserDto);
    }
}
