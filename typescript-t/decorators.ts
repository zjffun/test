import { Controller, Get, Query, Request } from "@nestjs/common";

@Controller("/test")
export class TestController {
  @Get("/test2")
  getInfo(@Query("id") id, @Query("type") type, @Request() req) {
    return [id, type, req];
  }
}

