import { Directive, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[collisionDetection]',
  standalone: true
})
export class CollisionDetectionDirective {
  @Output() collision: EventEmitter<any> = new EventEmitter<any>();
  @Output() canContour: EventEmitter<any> = new EventEmitter<any>();
  private el: HTMLElement;

  constructor(elRef: ElementRef, private renderer: Renderer2) {
    this.el = elRef.nativeElement;
    this.renderer.addClass(this.el, 'collision-element');
  }

  ngDoCheck() {
    this.detectCollision();
  }

  detectCollision() {
    const rect1 = this.el.getBoundingClientRect();
    const elements = document.querySelectorAll('.collision-element');
    let canContour = true;
    let distanceToContour = 0;

    for (let i = 0; i < elements.length; i++) {
      const rect2 = elements[i].getBoundingClientRect();
      const overlap = this.getOverlap(rect1, rect2);

      if ((overlap.top > 0 || overlap.bottom) > 0 && (overlap.left > 0 || overlap.right > 0)) {
        this.collision.emit(overlap);
        canContour = false;
      }

      if (canContour) {
        const distance = this.getDistanceToContour(rect1, rect2);
        distanceToContour = Math.max(distanceToContour, distance);
      }
    }

    if (canContour) {
      this.canContour.emit(distanceToContour);
    }
  }

  private getOverlap(rect1: DOMRect, rect2: DOMRect): any {
    const overlap = {
      top: Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top)),
      bottom: Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top)),
      left: Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left)),
      right: Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left))
    };

    return overlap;
  }

  private getDistanceToContour(rect1: DOMRect, rect2: DOMRect): number {
    const distance = Math.max(
      rect2.right - rect1.left, 
      rect1.right - rect2.left, 
      rect2.bottom - rect1.top, 
      rect1.bottom - rect2.top
    );

    return distance;
  }
}
