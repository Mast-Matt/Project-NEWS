import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService, NewsParameters, NewsScores } from '../../core/news.service';
import { TranslationService, Language } from '../../core/translation.service';

@Component({
  selector: 'app-news-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-calculator.html',
  styleUrl: './news-calculator.css'
})
export class NewsCalculatorComponent {
  scores = signal<NewsScores | null>(null);
  showInfo = signal(true);

  parameters = signal<NewsParameters>({
    respiratoryRate: 16,
    oxygenSaturation: 96,
    temperature: 37.5,
    systolicBP: 120,
    heartRate: 75,
    acvpu: 'Alert',
    supplementalOxygen: false,
    oxygenScaleType: 'scale1'
  });

  acvpuOptions = ['Alert', 'Confused', 'Verbal', 'Pain', 'Unresponsive'] as const;

  constructor(
    private newsService: NewsService,
    public translationService: TranslationService
  ) {
    this.calculateNews();
  }

  calculateNews() {
    const result = this.newsService.calculateNews(this.parameters());
    this.scores.set(result);
  }

  updateParameter(field: keyof Omit<NewsParameters, 'avpu'>, value: number | boolean) {
    const params = { ...this.parameters() };
    (params as any)[field] = value;
    this.parameters.set(params);
    this.calculateNews();
  }

  updateACVPU(value: string) {
    const params = { ...this.parameters() };
    params.acvpu = value as any;
    this.parameters.set(params);
    this.calculateNews();
  }

  updateSupplementalOxygen(value: boolean) {
    const params = { ...this.parameters() };
    params.supplementalOxygen = value;
    this.parameters.set(params);
    this.calculateNews();
  }

  updateOxygenScaleType(value: 'scale1' | 'scale2') {
    const params = { ...this.parameters() };
    params.oxygenScaleType = value;
    this.parameters.set(params);
    this.calculateNews();
  }

  setLanguage(lang: Language) {
    this.translationService.setLanguage(lang);
  }

  get currentLanguage() {
    return this.translationService.currentLanguage;
  }

  getRiskColor(): string {
    const risk = this.scores()?.riskLevel;
    if (risk === 'low') return '#22c55e';
    if (risk === 'medium') return '#f59e0b';
    return '#ef4444';
  }

  getRiskBgColor(): string {
    const risk = this.scores()?.riskLevel;
    if (risk === 'low') return '#f0fdf4';
    if (risk === 'medium') return '#fffbeb';
    return '#fef2f2';
  }

  getRecommendationKey(): string {
    const risk = this.scores()?.riskLevel;
    if (risk === 'low') return 'recommendation-low';
    if (risk === 'medium') return 'recommendation-medium';
    return 'recommendation-high';
  }
}
