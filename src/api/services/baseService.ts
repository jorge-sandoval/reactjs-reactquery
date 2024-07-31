import { Config } from '../models/config';
import { BaseModel } from '../models/base';
import { PaginationConfig, PaginationResult } from '../models/pagination';

export default class BaseService<T extends BaseModel> {
  private storageKey: string;
  private defaultDelay: number | [number, number];
  private defaultFailRate: number;
  private defaultItems: T[];

  constructor(storageKey: string, config: Config = { delay: 500, failRate: 0 }, items: T[] = []) {
    this.storageKey = storageKey;
    this.defaultDelay = config.delay || 500;
    this.defaultFailRate = config.failRate || 0;
    this.defaultItems = items;
    this.initStorage();
  }

  private initStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaultItems));
    }
  }

  private getRandomDelay(delay: number | [number, number]): number {
    if (Array.isArray(delay) && delay.length === 2) {
      const [min, max] = delay;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return delay as number;
  }

  private async simulateAsync(config?: Config) {
    const delay = config?.delay !== undefined ? this.getRandomDelay(config.delay) : this.getRandomDelay(this.defaultDelay);
    const failRate = config?.failRate ?? this.defaultFailRate;

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < failRate) {
          reject('Error: Simulated failure');
        } else {
          resolve();
        }
      }, delay);
    });
  }

  async getAll(pagination?: PaginationConfig, config?:Config): Promise<PaginationResult<T>> {
    await this.simulateAsync(config);

    const items: T[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    if (!pagination) {
      return {
        items: items,
        currentPage: 1,
        pageSize: items.length,
        totalPages: 1,
        prevPage: null,
        nextPage: null,
      };
    }
    
    const pageSize = pagination.pageSize ?? 10;
    const currentPage = pagination.currentPage ?? 1;

    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = items.slice(startIndex, startIndex + pageSize);

    return {
      items: paginatedItems,
      currentPage,
      pageSize,
      totalPages,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
    };
  }

  async getById(id: string, config?: Config): Promise<T | undefined> {
    await this.simulateAsync(config);
    const items: T[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return items.find(item => item.id === id);
  }

  async create(item: T, config?: Config): Promise<T> {
    await this.simulateAsync(config);
    const items: T[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    item.id = crypto.randomUUID();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return item;
  }

  async update(updatedItem: T, config?: Config): Promise<T> {
    await this.simulateAsync(config);
    const items: T[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const index = items.findIndex(item => item.id === item.id);
    if (index !== -1) {
      items[index] = updatedItem;
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      return updatedItem;
    }
    throw new Error(`Item with id ${updatedItem.id} not found`);
  }

  async delete(id: string, config?: Config): Promise<string> {
    await this.simulateAsync(config);
    let items: T[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    items = items.filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return id;
  }
}
