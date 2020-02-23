import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'keyword'
})
export class KeyWordHighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(val: string, keyword: string): any {
    const Reg = new RegExp(keyword, 'i');
    if (val) {
      const res = val.replace(Reg, `<span style="color: red;">${keyword}</span>`);
      return this.sanitizer.bypassSecurityTrustHtml(res);
    }
  }

}
