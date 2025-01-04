import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAllowonlynumbers]',
  standalone: true 
})
export class AllowonlynumbersDirective {

  constructor(private el: ElementRef , @Optional() private ngControl: NgControl) { }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.el?.nativeElement?.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    this.ngControl?.control?.setValue(this.el?.nativeElement?.value);

    if (initalValue !== this.el?.nativeElement?.value) {
      event.stopPropagation();
    }
  }

}