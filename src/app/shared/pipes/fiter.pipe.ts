import { Pipe } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';

@Pipe({
    name: 'filterBy'
})
export class FilterPipe {
    transform(items: Produto[], id: number, args: string[]): any {
        // let fieldName = args[0];
        // let fieldValue = args[1];
        // return value.filter((e) => {
        //     return (e[fieldName] == fieldValue);
        // });
        console.log(items, id)
        return items.filter(item => item.id == id);

    }
}