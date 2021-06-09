# Language utl

## Suggesting

To get language data suggestions by user input:

```typescript
import { suggest } from '@tginternal/language-util';

console.log(suggest('cs'));
```

```typescript
[
  {
    englishName: 'Czech',
    flags: ['🇨🇿'],
    languageId: 'cs',
    originalName: 'čeština',
  },
];
```

## Validation

```
import { isValidLanguageTag } from '@tginternal/language-util';

isValidLanguageTag("cs-CZ") //true
isValidLanguageTag("cs-CZ") //false
```
