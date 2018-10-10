import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intro'
})
export class IntroPipe implements PipeTransform {

  transform(text: string, letters: number = 200): string {
    if (!text) {
      return '';
    }

    return `${text.substring(0, letters)}...`;
  }

}
