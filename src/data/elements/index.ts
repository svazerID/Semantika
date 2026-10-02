import { SemanticElement } from '../../types';
import { structureElements } from './structure';
import { textElements } from './text';
import { mediaElements } from './media';
import { interactiveElements } from './interactive';
import { formsAndTabularElements } from './formsAndTabular';

export const allSemanticElements: SemanticElement[] = [
  ...structureElements,
  ...textElements,
  ...mediaElements,
  ...interactiveElements,
  ...formsAndTabularElements
];

export const getElementById = (id: string): SemanticElement | undefined => {
  return allSemanticElements.find(el => el.id === id);
};

export const getElementsByCategory = (category: string): SemanticElement[] => {
  if (category === 'all') return allSemanticElements;
  return allSemanticElements.filter(el => el.category === category);
};
