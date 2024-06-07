import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class TaskDto {
  @IsString()
  @ApiProperty({ example: 'Прочесть книгу', description: 'Описание задачи' })
  name: string;

  @IsBoolean()
  @ApiProperty({ example: 'true', description: 'Статус выполнения' })
  isDone: boolean;
}

export class TaskResDto {
  @IsNumber()
  @ApiProperty()
  id: number;
  
  @IsString()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  isDone: boolean;
}
