import {Directive, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {TypeService} from '../service/type.service';
import {DialogService} from '../service/dialog.service';

@Directive({
  selector: '[appTextareaAutoHeight]'
})
export class TextareaAutoHeightDirective {

  @Input() appMaxLength: number;
  public baseRem: number = 37.5;

  constructor(public element: ElementRef,
              public dialogService: DialogService,
              public typeService: TypeService) {
    this.adjustHeight();
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjustHeight();
  }

  @HostListener('blur', ['$event.target'])
  blur(textArea: HTMLTextAreaElement): void {
    console.log('监听失去焦点')
    this.adjustHeight();
  }
  @HostListener('focus', ['$event.target'])
  focus(textArea: HTMLTextAreaElement): void {
    console.log('监听焦点')
    this.adjustHeight();
  }

  public adjustHeight(minHeight?: number) {
    if (!minHeight) {
      minHeight = 32;
    }
    let el = this.element.nativeElement;
    // 防止字数超出长度
    if (this.appMaxLength) {
      let countLen = this.typeService.getStringLocaleLen(el.value);
      if (countLen > this.appMaxLength) {
        this.element.nativeElement.value = this.typeService.localeSubString(el.value, 0, this.appMaxLength);
        this.dialogService.openTipDialog({
          content: `最多输入${this.appMaxLength}个字符`
        });

      }
    }
    // compute the height difference which is caused by border and outline
    // let outerHeight = parseInt(window.getComputedStyle(el).height, 10);
    let diff = el.offsetHeight - el.clientHeight;
    // set the height to 0 in case of it has to be shrinked
    el.style.height = 0;
    // set the correct height
    // el.scrollHeight is the full height of the content, not just the visible part
    el.style.height = Math.max(minHeight, el.scrollHeight + diff) / this.baseRem + 'rem';
  }

}
