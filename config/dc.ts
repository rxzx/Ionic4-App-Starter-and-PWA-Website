import { SimplePlaceholderMapper } from "@angular/compiler/src/i18n/serializers/serializer";
import { Injectable } from "@angular/core";
import { EventEmitterProxy } from "ionic-angular/umd/components/content/content";
import { filter } from "rxjs/operator/filter";

class Store<T>
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
        removeById(entity:any) {
            let index=this.list.indexOf(entity);
            if(index>-1)
            {
                this.list.splice(index,1);    
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
                    let filterIndex=filterList[filterId].indexOf(entity);
                    if(filterIndex>-1)
                    {
                        filterList[filterId].splice(filterIndex,1);
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
export enum DCFilters {
    FolderId = "folderId",
    SlugName = "slugName"
}

class Folder {
    id: string;
    name: string;
    tickers: Ticker[];


    public static getById(dto: any): string {
        return dto.id;
    }



    fillObservableProperties(dataContext: DataContext) {
        this.tickers = dataContext.tickerStore.getFilter(DCFilters.FolderId, this.id);
    }

    public static Mapper(dto: any, entity: Folder, dataContext: DataContext): Folder {

        if (!entity) {
            entity = new Folder();
        }
        entity.id = dto.id;
        entity.name = dto.name;
        entity.fillObservableProperties(dataContext);
        return entity;
    }
}

class Slug {
    id: string;
    name: string;
    tickers: Ticker[];


    public static getById(dto: any): string {
        return dto.id;
    }



    fillObservableProperties(dataContext: DataContext) {
        this.tickers = dataContext.tickerStore.getFilter(DCFilters.SlugName, this.name);
    }

    public static Mapper(dto: any, entity: Folder, dataContext: DataContext): Folder {

        if (!entity) {
            entity = new Folder();
        }
        entity.id = dto.id;
        entity.name = dto.name;
        entity.fillObservableProperties(dataContext);
        return entity;
    }
}

class Media {
    id: string;
    name: string;


    public static getById(dto: any): string {
        return dto.id;
    }



    public static Mapper(dto: any, entity: Media, dataContext: DataContext): Media {
        if (!entity) {
            entity = new Media();
        }
        entity.id = dto.id;
        entity.name = dto.name;
        return entity;
    }
}

class Ticker {
    static keys: string[] = [DCFilters.SlugName, DCFilters.FolderId];
    id: string;
    name: string;
    media: Media[];
    folderId: string;
    slugName: string;
    slug:Slug;
    folder:Folder;
    public static getById(dto: any): string {
        return dto.Id;
    }

    fillObservableProperties(dataContext: DataContext) {
        this.folder = dataContext.folderStore.get(this.folderId);
        this.slug = dataContext.slugStore.get(this.slugName);
    }

    public static Mapper(dto: any, entity: Ticker, dataContext: DataContext): Ticker {
        if (!entity) {
            entity = new Ticker();
            if (dto.media) {
                entity.media = [];
                dto.media.forEach(element => {
                    let media: Media = dataContext.mediaStore.update(element)
                    entity.media.push(media);
                });
            }
        }
        
        entity.id = dto.Id;
        entity.name = dto.name;
        entity.folderId = dto.folderId;
        entity.fillObservableProperties(dataContext)
        return entity;
    }
}
@Injectable()
export class DataContext {
    tickerStore: Store<Ticker>;
    mediaStore: Store<Media>;
    folderStore: Store<Folder>;
    slugStore: Store<Folder>;
    constructor() {
        this.tickerStore = new Store<Ticker>(this, Ticker.Mapper, Ticker.getById, Ticker.keys);
        this.mediaStore = new Store<Media>(this, Media.Mapper, Ticker.getById);
        this.folderStore = new Store<Folder>(this, Folder.Mapper, Folder.getById);
        this.slugStore = new Store<Slug>(this, Slug.Mapper, Slug.getById);
    }

}