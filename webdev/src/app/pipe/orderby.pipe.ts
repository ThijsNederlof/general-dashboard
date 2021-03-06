import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myOrderByPipe'
})
export class OrderByPipe implements PipeTransform {

  public transform(array: string[], args: string): string[] {

    if (!array || array === undefined || array.length === 0) {
      return null;
    }

    array.sort((a: any, b: any) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;

  }
}
