export const CATEGORIES_BY_TYPE = {
  income: [
    { text: 'Work', value: 'Work' },
    { text: 'Card', value: 'Card' },
  ],
  expense: [
    { text: 'Food', value: 'Food' },
    { text: 'Car', value: 'Car' },
    { text: 'Home', value: 'Home' },
  ],
}

// для фильтра «все типы» в таблице
export const ALL_CATEGORIES = [
  ...CATEGORIES_BY_TYPE.income,
  ...CATEGORIES_BY_TYPE.expense,
]
// чтобы не писать 'Food' / 'Work' строками в двух watch
export const DEFAULT_CATEGORY = {
  income: 'Work',
  expense: 'Food',
}