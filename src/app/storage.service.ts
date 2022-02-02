import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    public store(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public read(key: string): string | null {
        return localStorage.getItem(key);
    }
}