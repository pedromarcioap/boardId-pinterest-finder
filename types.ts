export interface ExtractionResult {
  boardId: string | null;
  boardName: string | null;
  ownerName: string | null;
  error?: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface BoardUrlInfo {
  isValid: boolean;
  username?: string;
  slug?: string;
  fullUrl?: string;
}
