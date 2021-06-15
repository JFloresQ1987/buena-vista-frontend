import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { AppConfiguration } from '../../interfaces/configuration/app-configuration.interface';
import { environment } from 'src/environments/environment';
// import { environment } from '../../../environments/environment.prod';
// import { environment } from '@environments/environment';
// import { AppConfig } from '@shared/interfaces/app-config.interface';
import { Observable, throwError } from 'rxjs';
;

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    static settings: AppConfiguration;

    constructor(private http: HttpClient) { }

    loadConfig(): Promise<AppConfiguration> {
        const jsonFile = `assets/config.${environment.name}.json`;
        return this.http.get<AppConfiguration>(jsonFile).pipe(
            tap(resp => ConfigurationService.settings = resp),
            catchError(e => throwError(`Could not load file '${jsonFile}': ${JSON.stringify(e)}`))
        ).toPromise()
    }
}