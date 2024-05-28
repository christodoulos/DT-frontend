import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IAPNPLC } from '../interfaces/APNPLC';

@Injectable({
    providedIn: 'root',
})
export class ApnService {
    http = inject(HttpClient);

    getPlcRecords(daysBefore: number): Observable<IAPNPLC[]> {
        const url = environment.API_URL + `/apnplc/${daysBefore}`;
        return this.http.get<IAPNPLC[]>(url);
    }
}
