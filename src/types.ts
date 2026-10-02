export type ElementCategory = 
  | 'structure' 
  | 'text' 
  | 'media' 
  | 'interactive' 
  | 'form' 
  | 'tabular';

export type Language = 'id' | 'en';

export interface AttributeInfo {
  name: string;
  type: 'global' | 'specific';
  description: {
    id: string;
    en: string;
  };
  example?: string;
  required?: boolean;
}

export interface SemanticElement {
  id: string;
  tag: string;
  name: {
    id: string;
    en: string;
  };
  category: ElementCategory;
  summary: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  whySemantic: {
    id: string;
    en: string;
  };
  divSoupComparison: {
    divSoupCode: string;
    semanticCode: string;
    benefits: {
      id: string[];
      en: string[];
    };
  };
  attributes: AttributeInfo[];
  exampleCode: string;
  livePreviewCss?: string;
  accessibility: {
    role: string;
    screenReaderDescription: {
      id: string;
      en: string;
    };
    keyboardSupport?: string;
    wcagCriteria?: string;
  };
  seoImpact: {
    id: string;
    en: string;
  };
  bestPractices: {
    dos: { id: string[]; en: string[] };
    donts: { id: string[]; en: string[] };
  };
  relatedElements: string[];
}

export interface QuizQuestion {
  id: string;
  category: ElementCategory | 'general';
  scenario: {
    id: string;
    en: string;
  };
  question: {
    id: string;
    en: string;
  };
  codeSnippet?: string;
  options: {
    id: string;
    text: { id: string; en: string };
  }[];
  correctOptionId: string;
  explanation: {
    id: string;
    en: string;
  };
}

export interface LintIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  title: { id: string; en: string };
  message: { id: string; en: string };
  suggestedFix?: string;
  line?: number;
  offendingCode?: string;
  category: 'div-soup' | 'accessibility' | 'structure' | 'seo';
}

export interface LintResult {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  issues: LintIssue[];
  stats: {
    divCount: number;
    semanticCount: number;
    semanticRatio: number;
    headingHierarchyOk: boolean;
    landmarksCount: number;
  };
  cleanedHtml?: string;
}

export interface BuilderNode {
  id: string;
  tag: string;
  label: string;
  content?: string;
  attributes?: Record<string, string>;
  children?: BuilderNode[];
}
