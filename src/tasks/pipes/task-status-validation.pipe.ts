import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not a valid status.`);
        }
        return value;
    }

    isStatusValid(status: any): boolean {
        const idx = Object.values(TaskStatus).indexOf(status);
        return idx !== -1;
    }
}