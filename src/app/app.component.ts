import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeyboardControlDirective } from '@directives';
import { CollisionDetectionDirective } from '@directives';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    KeyboardControlDirective,
    CollisionDetectionDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'immuno-game';
  bob(event: any) {
    console.dir(event);
  }
}
