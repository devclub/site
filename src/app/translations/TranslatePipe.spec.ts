import { TranslatePipe } from './TranslatePipe';
import { TranslationService } from './TranslationService';

function pipeWith(map: Record<string, string>): TranslatePipe {
  return new TranslatePipe({ get: (code: string) => map[code] } as TranslationService);
}

describe('TranslatePipe', () => {
  it('returns the translation for a known code', () => {
    expect(pipeWith({ plain: 'Plain text' }).transform('plain')).toBe('Plain text');
  });

  it('substitutes {{param}} placeholders', () => {
    expect(pipeWith({ greeting: 'Hello {{name}}' }).transform('greeting', { name: 'World' })).toBe('Hello World');
  });

  it('returns the code itself when there is no translation', () => {
    expect(pipeWith({}).transform('missing.key')).toBe('missing.key');
  });
});
