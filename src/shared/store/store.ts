import { DataContext } from "./datacontext.service";

export class Store<T>
{
    dictionaryFilter = {};
    dictionary = {}
    list: T[] = [];
    constructor(private dataContext: DataContext, private mapper: any, private getById: any = null, private keys: string[] = null) {

    }
    update(dto: any): T {

        let item = null;
        let id = null;
        if (this.getById) {
            id = this.getById(dto);
        }
        else {
            id = dto[id];
        }
        if (this.dictionary[id]) {
            item = this.dictionary[id];
            item = this.mapper(dto, item, this.dataContext);
        }
        else {
            item = this.mapper(dto, item, this.dataContext);
            this.dictionary[id] = item;
            this.list.push(item);
        }
        if (this.keys) {
            this.keys.forEach(key => {
                if (!this.dictionaryFilter[key]) {
                    this.dictionaryFilter[key] = {};
                }
                let filterList = this.dictionaryFilter[key];
                let filterId = item[key];
                if (!filterList[filterId]) {
                    filterList[filterId] = [];
                }
                if (filterList[filterId].indexOf(item) === -1) {
                    filterList[filterId].push(item);
                }

            });
        }
        return item;
    }
    removeById(entity: any) {
        let index = this.list.indexOf(entity);
        if (index > -1) {
            this.list.splice(index, 1);
            delete this.dictionary[entity.id];
            this.keys.forEach(key => {
                if (!this.dictionaryFilter[key]) {
                    this.dictionaryFilter[key] = {};
                }
                let filterList = this.dictionaryFilter[key];
                let filterId = entity[key];
                if (!filterList[filterId]) {
                    filterList[filterId] = [];
                }
                let filterIndex = filterList[filterId].indexOf(entity);
                if (filterIndex > -1) {
                    filterList[filterId].splice(filterIndex, 1);
                }


            });

        }
    }

    get(id: string): T {
        return this.dictionary[id];
    }

    getAll(): T[] {
        return this.list;
    }

    public getFilter(key, id): T[] {
        if (!this.dictionaryFilter[key]) {
            this.dictionaryFilter[key] = {};
        }
        let filterList = this.dictionaryFilter[key];
        if (!filterList[id]) {
            filterList[id] = [];
        }
        return filterList[id];
    }

}
