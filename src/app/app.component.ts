import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { PatientInfo } from './service/patientInfo';
import { SearchPatientService } from './service/SearchPatientService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Patient Search Application';

  public patientSearchForm: FormGroup;
  public keyWordSearchForm: FormGroup;
  public selectType: FormGroup;
  public patientInfo: PatientInfo;
  public name: string;
  public doc: string[];
  public dataLength: boolean;
  public errorMsg: string;
  keyWord: string;
  showContentName: boolean;
  showContentWord: boolean;


  constructor(
    private fb: FormBuilder,
    private searchPatientService: SearchPatientService) 
  { }

  ngOnInit() {
    this.showContentName = true;
    this.showContentWord = false;

    this.patientSearchForm = this.fb.group({
      'patientName': new FormControl('', [Validators.required])
    });
    this.keyWordSearchForm = this.fb.group({
      'keyWord': new FormControl('', [Validators.required])
    });
    this.selectType = this.fb.group({
      'type': new FormControl('', [Validators.required])
    });
    this.onChanges();
    this.isReadMore(this.doc[0]);
  }

  onChanges(): void {
    this.keyWord = "";
    this.doc = [];
    this.selectType.get('type').valueChanges
      .subscribe(
        type => {
          console.log(type);
          if (type == 'name') {
            this.showContentName = true;
            this.showContentWord = false;
          } else if (type == 'word') {
            this.showContentName = false;
            this.showContentWord = true;
          }
        }
      )
  };

  onKeyName(event: any) {
    const patientName: string = this.patientSearchForm.get('patientName').value || '';
    if (patientName === '') {
      this.doc = [];
      this.errorMsg = "";
    }
    this.searchPatientService.findPatientByName(patientName)
      .subscribe(patientInfo => {
        this.patientInfo = patientInfo;
        if (this.patientInfo === null) {
          this.doc = [];
          this.errorMsg = "Sorry, no search results for patient name: " + patientName;
        } else {
          this.doc = patientInfo.documents;
          this.errorMsg = "";
        }
      },
        (() => { }),
        (() => { }));
  }

  onKeyWord(event: any) {
    const word: string = this.keyWordSearchForm.get('keyWord').value || '';
    this.keyWord = word;
    if (word === '') {
      this.doc = [];
      this.errorMsg = "";
    }
    this.searchPatientService.findDocByKey(word)
      .subscribe(resp => {
        this.doc = resp;
        if (this.doc.length === 0) {
          this.errorMsg = "Sorry, no search results for key word: " + word;
        } else {
          this.errorMsg = "";
        }
      },
        (() => { }),
        (() => { }));
  }

  isReadMore(data: string) {
    this.dataLength = !(data.length > 40)
  }

  print(id:string): void {
    let printContents: string, popupWin: Window;
    printContents = id;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Patient report</title>
        </head>
    <body onload="window.print();window.close()"><pre>${printContents}</pre></body>
      </html>`
    );
    popupWin.document.close();
  }

  // This is a deprecated method, never be used.
  open(id:string): void {
    let printContents, popupWin;
    printContents = id;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Patient report</title>
        </head>
          <body><pre>${id}</pre></body>
      </html>`
    );
    popupWin.document.close();
  }


}
