import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(values: any[], args?: any): any {
    console.log('Pipe Arguments:', args)

    return values.filter(event => event.category === args);
  }

}