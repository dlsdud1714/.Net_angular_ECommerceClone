import { Iproduct } from './Iproduct';

export interface IPagination {
    pageIndex: number
    pageSize: number
    count: number
    data: Iproduct[]
  }