import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsCalculatorComponent } from './pages/news-calculator/news-calculator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NewsCalculatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Project-NEWS');
}
