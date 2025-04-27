export interface StrapiPaginationMeta {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }
  
  export interface StrapiResponse<T> {
    data: T[];
    meta: StrapiPaginationMeta;
  }
  