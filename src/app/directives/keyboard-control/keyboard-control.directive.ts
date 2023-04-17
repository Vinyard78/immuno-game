import { Directive, HostListener, Input, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[keyboardControl]',
  standalone: true
})
export class KeyboardControlDirective {
  @Input() increment: number = 10;
  @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
  private el: HTMLElement;
  private isSelected = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.el = elRef.nativeElement;
    this.renderer.setStyle(this.el, 'position', 'relative');
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    this.isSelected = this.el.contains(event.target as Node);
    this.renderer.setStyle(this.el, 'background', this.isSelected ? 'blue' : 'unset');
  }

  @HostListener('window:keydown.arrowup', ['$event']) onArrowUp(event: KeyboardEvent) {
    if(this.isSelected) {
      event.preventDefault();
      this.moveElement(0, -this.increment);
    }
  }

  @HostListener('window:keydown.arrowdown', ['$event']) onArrowDown(event: KeyboardEvent) {
    if(this.isSelected) {
      event.preventDefault();
      this.moveElement(0, this.increment);
    }
  }

  @HostListener('window:keydown.arrowleft', ['$event']) onArrowLeft(event: KeyboardEvent) {
    if(this.isSelected) {
      event.preventDefault();
      this.moveElement(-this.increment, 0);
    }
  }

  @HostListener('window:keydown.arrowright', ['$event']) onArrowRight(event: KeyboardEvent) {
    if(this.isSelected) {
      event.preventDefault();
      this.moveElement(this.increment, 0);
    }
  }

  private moveElement(x: number, y: number) {
    const currentTop = parseFloat(this.el.style.top) || 0;
    const currentLeft = parseFloat(this.el.style.left) || 0;
    const newTop = currentTop + y;
    const newLeft = currentLeft + x;
    this.renderer.setStyle(this.el, 'top', `${newTop}px`);
    this.renderer.setStyle(this.el, 'left', `${newLeft}px`);
  }
}
