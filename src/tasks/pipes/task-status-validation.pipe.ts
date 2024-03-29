import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../helpers/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];

  // validating the value of the STATUS
  transform(value: any) {
    if (!value) throw new BadRequestException('No status provided');

    value = value.toUpperCase();

    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} is an invalid status`);

    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
