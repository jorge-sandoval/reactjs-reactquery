export interface PaginationConfig {
    pageSize?: number;
    currentPage?: number;
  }
  
  export interface PaginationResult<T> {
    items: T[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
  }
  