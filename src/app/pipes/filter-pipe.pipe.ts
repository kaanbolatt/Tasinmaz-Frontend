import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: User[], filterText:string): User[] {
    filterText = filterText?filterText.toLocaleLowerCase():""

    return filterText?value.filter((u:User)=>u.uName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
