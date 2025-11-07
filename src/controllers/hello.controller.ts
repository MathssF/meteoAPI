import { Controller, Get, Post, Body, Query } from '@nestjs/common';;

@Controller() 
export class Hello {
  @Get()
  hello() {
    'Hello World!'
  }
}