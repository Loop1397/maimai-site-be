import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async signUpUser(@Body() body: string) {
        return await this.userService.signUpUser(body);
    }
}
