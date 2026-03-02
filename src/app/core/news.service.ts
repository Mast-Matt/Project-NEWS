import { Injectable } from '@angular/core';

export interface NewsScores {
  respiratoryRate: number;
  oxygenSaturation: number;
  temperature: number;
  systolicBP: number;
  heartRate: number;
  consciousness: number;
  supplementalOxygen: number;
  total: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface NewsParameters {
  respiratoryRate: number;
  oxygenSaturation: number;
  temperature: number;
  systolicBP: number;
  heartRate: number;
  acvpu: 'Alert' | 'Confused' | 'Verbal' | 'Pain' | 'Unresponsive';
  supplementalOxygen: boolean;
  oxygenScaleType: 'scale1' | 'scale2';
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // NEWS 2 Scoring Rules
  private readonly respiratoryRateScores = [
    { min: 0, max: 8, score: 3 },
    { min: 9, max: 11, score: 1 },
    { min: 12, max: 20, score: 0 },
    { min: 21, max: 24, score: 2 },
    { min: 25, max: 999, score: 3 }
  ];

  private readonly oxygenSaturationScores = [
    { min: 0, max: 91, score: 3 },
    { min: 92, max: 93, score: 2 },
    { min: 94, max: 95, score: 1 },
    { min: 96, max: 100, score: 0 }
  ];

  // Scale 2: For hypercapnic respiratory failure (e.g., COPD with lower usual oxygen target)
  private readonly oxygenSaturationScoresScale2 = [
    { min: 0, max: 83, score: 3 },
    { min: 84, max: 85, score: 2 },
    { min: 86, max: 87, score: 1 },
    { min: 88, max: 92, score: 0 }
  ];

  // Scale 2 scores for SpO2 ≥ 93 on supplemental oxygen
  private readonly oxygenSaturationScoresScale2Above93 = [
    { min: 93, max: 94, score: 1 },
    { min: 95, max: 96, score: 2 },
    { min: 97, max: 100, score: 3 }
  ];

  private readonly temperatureScores = [
    { min: 0, max: 35.0, score: 3 },
    { min: 35.1, max: 36.0, score: 1 },
    { min: 36.1, max: 38.0, score: 0 },
    { min: 38.1, max: 39.0, score: 1 },
    { min: 39.1, max: 999, score: 2 }
  ];

  private readonly systolicBPScores = [
    { min: 0, max: 90, score: 3 },
    { min: 91, max: 100, score: 2 },
    { min: 101, max: 110, score: 1 },
    { min: 111, max: 219, score: 0 },
    { min: 220, max: 999, score: 3 }
  ];

  private readonly heartRateScores = [
    { min: 0, max: 40, score: 3 },
    { min: 41, max: 50, score: 1 },
    { min: 51, max: 90, score: 0 },
    { min: 91, max: 110, score: 1 },
    { min: 111, max: 130, score: 2 },
    { min: 131, max: 999, score: 3 }
  ];

  private readonly consciousnessScores = {
    'Alert': 0,
    'Confused': 3,
    'Verbal': 3,
    'Pain': 3,
    'Unresponsive': 3
  };

  calculateNews(params: NewsParameters): NewsScores {
    const respiratoryScore = this.getScore(params.respiratoryRate, this.respiratoryRateScores);
    
    // Calculate oxygen saturation score based on scale type
    let oxygenScore = 0;
    if (params.oxygenScaleType === 'scale2') {
      // Scale 2 has special logic for SpO2 ≥ 93
      if (params.oxygenSaturation >= 93) {
        if (params.supplementalOxygen) {
          // On oxygen: use the above-93 scoring table
          oxygenScore = this.getScore(params.oxygenSaturation, this.oxygenSaturationScoresScale2Above93);
        } else {
          // Room air and ≥ 93: score = 0
          oxygenScore = 0;
        }
      } else {
        // SpO2 < 93: use standard scale 2 table
        oxygenScore = this.getScore(params.oxygenSaturation, this.oxygenSaturationScoresScale2);
      }
    } else {
      // Scale 1: standard scoring
      oxygenScore = this.getScore(params.oxygenSaturation, this.oxygenSaturationScores);
    }
    
    const temperatureScore = this.getScore(params.temperature, this.temperatureScores);
    const bpScore = this.getScore(params.systolicBP, this.systolicBPScores);
    const heartRateScore = this.getScore(params.heartRate, this.heartRateScores);
    const consciousnessScore = this.consciousnessScores[params.acvpu];
    
    // Additional point if supplemental oxygen is being used
    const supplementalOxygenScore = params.supplementalOxygen ? 2 : 0;

    const total = respiratoryScore + oxygenScore + temperatureScore + bpScore + 
                  heartRateScore + consciousnessScore + supplementalOxygenScore;

    const riskLevel = this.getRiskLevel(total);
    const recommendation = this.getRecommendation(riskLevel);

    return {
      respiratoryRate: respiratoryScore,
      oxygenSaturation: oxygenScore,
      temperature: temperatureScore,
      systolicBP: bpScore,
      heartRate: heartRateScore,
      consciousness: consciousnessScore,
      supplementalOxygen: supplementalOxygenScore,
      total,
      riskLevel,
      recommendation
    };
  }

  private getScore(value: number, scoreTable: Array<{ min: number; max: number; score: number }>): number {
    const entry = scoreTable.find(s => value >= s.min && value <= s.max);
    return entry ? entry.score : 0;
  }

  private getRiskLevel(total: number): 'low' | 'medium' | 'high' {
    if (total <= 4) return 'low';
    if (total <= 6) return 'medium';
    return 'high';
  }

  private getRecommendation(riskLevel: 'low' | 'medium' | 'high'): string {
    switch (riskLevel) {
      case 'low':
        return 'Routine ward-based care with standard observations';
      case 'medium':
        return 'Increased monitoring required; notify clinical team for reassessment';
      case 'high':
        return 'Immediate action - escalate to senior clinician; consider ICU assessment';
    }
  }
}
