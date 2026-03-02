import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'vi';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLanguage = signal<Language>('en');

  private translations: { [key in Language]: { [key: string]: string } } = {
    en: {
      'title': 'National Early Warning Score (NEWS 2) Calculator',
      'subtitle': 'Clinical deterioration assessment tool for hospital patients',
      'what-is-news': 'What is NEWS 2?',
      'about-news': 'About NEWS 2',
      'description': 'The National Early Warning Score 2 (NEWS 2) is a clinical scoring system that helps identify patients at risk of clinical deterioration. It monitors key vital signs and alerts healthcare professionals when intervention is needed.',
      'when-to-use': 'When to use NEWS 2:',
      'use-1': 'All acute hospital in-patients',
      'use-2': 'Emergency department patients',
      'use-3': 'During and after patient deterioration',
      'use-4': 'At handover and shift changes',
      'parameter-guidelines': 'Parameter Guidelines',
      'respiratory-rate-guide': 'Respiratory Rate: Breaths per minute (normal: 12-20)',
      'oxygen-sat-guide': 'Oxygen Saturation (SpO₂): Percentage of oxygen in blood (normal: 96-100%)',
      'temperature-guide': 'Temperature: Body temperature in Celsius (normal: 36.1-38.0°C)',
      'systolic-bp-guide': 'Systolic Blood Pressure: Upper BP reading in mmHg (normal: 111-219 mmHg)',
      'heart-rate-guide': 'Heart Rate: Beats per minute (normal: 51-90 bpm)',
      'acvpu-guide': 'ACVPU Scale: Level of consciousness',
      'alert': 'Alert: Awake and alert',
      'confused': 'Confused: Confused or disoriented',
      'verbal': 'Verbal: Responds to voice',
      'pain': 'Pain: Responds to pain',
      'unresponsive': 'Unresponsive: No response',
      'enter-vital-signs': 'Enter Vital Signs',
      'respiratory-rate': 'Respiratory Rate (breaths/min)',
      'oxygen-saturation': 'Oxygen Saturation (%)',
      'temperature': 'Temperature (°C)',
      'systolic-bp': 'Systolic BP (mmHg)',
      'heart-rate': 'Heart Rate (bpm)',
      'consciousness': 'Consciousness (ACVPU)',
      'supplemental-oxygen': 'Supplemental Oxygen in Use',
      'oxygen-scale': 'Oxygen Saturation Scale',
      'scale-1': 'Scale 1 (Standard)',
      'scale-2': 'Scale 2 (Hypercapnic)',
      'hypercapnic-notice': 'For patients with known hypercapnic respiratory failure (e.g., COPD with lower oxygen targets)',
      'score': 'Score',
      'news-score-result': 'NEWS 2 Score Result',
      'risk-level': 'Risk Level',
      'score-breakdown': 'Score Breakdown',
      'total': 'TOTAL',
      'clinical-recommendation': 'Clinical Recommendation:',
      'risk-guidelines': 'Risk Level Guidelines:',
      'low-risk': 'Low Risk (0-4): Routine ward-based care with standard observations',
      'medium-risk': 'Medium Risk (5-6): Increased monitoring; notify clinical team for reassessment',
      'high-risk': 'High Risk (7+): Immediate action required; escalate to senior clinician',
      'footer': 'This tool is for educational demonstration purposes. Always follow institutional protocols and clinical judgment when assessing patients. NEWS 2 was developed by the Royal College of Physicians.',
      'recommendation-low': 'Routine ward-based care with standard observations',
      'recommendation-medium': 'Increased monitoring required; notify clinical team for reassessment',
      'recommendation-high': 'Immediate action - escalate to senior clinician; consider ICU assessment'
    },
    vi: {
      'title': 'Máy tính Điểm Cảnh báo Sớm Quốc gia (NEWS 2)',
      'subtitle': 'Công cụ đánh giá suy giảm lâm sàng cho bệnh nhân nằm viện',
      'what-is-news': 'NEWS 2 là gì?',
      'about-news': 'Về NEWS 2',
      'description': 'Điểm Cảnh báo Sớm Quốc gia 2 (NEWS 2) là một hệ thống chấm điểm lâm sàng giúp xác định các bệnh nhân có nguy cơ suy giảm lâm sàng. Nó theo dõi các dấu hiệu sống chính và cảnh báo các chuyên gia chăm sóc sức khỏe khi cần can thiệp.',
      'when-to-use': 'Khi nào sử dụng NEWS 2:',
      'use-1': 'Tất cả bệnh nhân nằm viện cấp tính',
      'use-2': 'Bệnh nhân phòng khám cấp cứu',
      'use-3': 'Trong và sau khi bệnh nhân suy giảm',
      'use-4': 'Tại điểm giao ca và thay ca làm việc',
      'parameter-guidelines': 'Hướng dẫn Các Thông số',
      'respiratory-rate-guide': 'Nhịp thở: Số lần thở mỗi phút (bình thường: 12-20)',
      'oxygen-sat-guide': 'Độ bão hòa oxy (SpO₂): Phần trăm oxy trong máu (bình thường: 96-100%)',
      'temperature-guide': 'Nhiệt độ: Nhiệt độ cơ thể tính bằng Celsius (bình thường: 36,1-38,0°C)',
      'systolic-bp-guide': 'Huyết áp Tâm trương: Chỉ số BP trên tính bằng mmHg (bình thường: 111-219 mmHg)',
      'heart-rate-guide': 'Nhịp tim: Số lần đập mỗi phút (bình thường: 51-90 bpm)',
      'acvpu-guide': 'Thang đo ACVPU: Mức độ tỉnh táo',
      'alert': 'Alert: Tỉnh táo và cảnh báo',
      'confused': 'Confused: Lú lẫn hoặc bị mất định hướng',
      'verbal': 'Verbal: Phản ứng với giọng nói',
      'pain': 'Pain: Phản ứng với đau',
      'unresponsive': 'Unresponsive: Không phản ứng',
      'enter-vital-signs': 'Nhập Dấu hiệu Sống',
      'respiratory-rate': 'Nhịp thở (lần/phút)',
      'oxygen-saturation': 'Độ bão hòa oxy (%)',
      'temperature': 'Nhiệt độ (°C)',
      'systolic-bp': 'Huyết áp Tâm trương (mmHg)',
      'heart-rate': 'Nhịp tim (lần/phút)',
      'consciousness': 'Mức độ tỉnh táo (ACVPU)',
      'supplemental-oxygen': 'Sử dụng Oxy bổ sung',
      'oxygen-scale': 'Thang đo Độ bão hòa oxy',
      'scale-1': 'Thang 1 (Tiêu chuẩn)',
      'scale-2': 'Thang 2 (Gây tích tụ CO₂)',
      'hypercapnic-notice': 'Dành cho bệnh nhân có suy hô hấp gây tích tụ CO₂ (ví dụ: COPD với mục tiêu oxy thấp hơn)',
      'score': 'Điểm',
      'news-score-result': 'Kết quả Điểm NEWS 2',
      'risk-level': 'Mức độ Rủi ro',
      'score-breakdown': 'Chi tiết Điểm số',
      'total': 'TỔNG CỘNG',
      'clinical-recommendation': 'Khuyến cáo Lâm sàng:',
      'risk-guidelines': 'Hướng dẫn Mức độ Rủi ro:',
      'low-risk': 'Rủi ro Thấp (0-4): Chăm sóc tiêu chuẩn tại phòng bệnh',
      'medium-risk': 'Rủi ro Vừa phải (5-6): Tăng cường theo dõi; thông báo cho nhóm lâm sàng để đánh giá lại',
      'high-risk': 'Rủi ro Cao (7+): Cần hành động ngay lập tức; chuyển cho bác sĩ cấp cao',
      'footer': 'Công cụ này được sử dụng cho mục đích trình diễn giáo dục. Luôn tuân theo các quy trình của cơ sở và đán phán lâm sàng khi đánh giá bệnh nhân. NEWS 2 được phát triển bởi Học viện Hoàng gia Bác sĩ.',
      'recommendation-low': 'Chăm sóc tiêu chuẩn tại phòng bệnh với các quan sát chuẩn',
      'recommendation-medium': 'Cần tăng cường theo dõi; thông báo cho nhóm lâm sàng để đánh giá lại',
      'recommendation-high': 'Cần hành động ngay lập tức - chuyển cho bác sĩ cấp cao; xem xét đánh giá ICU'
    }
  };

  t(key: string): string {
    const lang = this.currentLanguage();
    return this.translations[lang][key] || this.translations['en'][key] || key;
  }

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
  }

  getLanguage(): Language {
    return this.currentLanguage();
  }
}
