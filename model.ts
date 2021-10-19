export class PageRequest<T>{
    count:number;
    pageIndex:number;
    pageSize:number;
    items : T[];
  
    constructor(count?:number,pageIndex?:number,pageSize?:number,items?:T[]){
      this.count = count;
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.items = items;
    }
  }

export class Pagination{
    page:number;
    count:number;
    pageSize:number;
    pageSizes:number[];
  
    constructor(page?:number,count?:number,pageSize?:number,pageSizes?:number[]) {
      this.page = page;
      this.count = count;
      this.pageSize = pageSize;
      this.pageSizes = pageSizes;
  
    }
  }