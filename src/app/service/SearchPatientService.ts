import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { PatientInfo } from './patientInfo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { SimpleResponse } from './SimpleResponse';
@Injectable()

export class SearchPatientService{
    patientInfo: PatientInfo;
    patientInfoUrl: string;
    docUrl: string;
    documents: string[];
    constructor(
        private http: HttpClient,
    ){}

    public findPatientByName(name: string): Observable<PatientInfo>{
        this.patientInfoUrl = '/api/patient/' + name;
        return this.http.get<SimpleResponse>(this.patientInfoUrl)
            .pipe(
                map(sr => {
                    if(sr.status ==='ok'){
                        this.patientInfo = sr.data;
                        console.log(this.patientInfo);
                        return this.patientInfo;
                    }
                })
            )
    }

    public findDocByKey(word: string): Observable<string[]>{
        this.docUrl = '/api/document/' + word;
        return this.http.get<SimpleResponse>(this.docUrl)
            .pipe(
                map(sr => {
                    if(sr.status ==='ok'){
                        this.documents = sr.data;
                        console.log(this.documents);
                        return this.documents;
                    }
                })
            )
    }
}