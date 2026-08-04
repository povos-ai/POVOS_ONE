export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomBoolean(
  probability = 0.8,
): boolean {
  return Math.random() < probability;
}

export function randomNumber(
  min: number,
  max: number,
): number {
  return Math.floor(
    Math.random() * (max - min + 1),
  ) + min;
}

export function randomFutureDate(
  minDays = 15,
  maxDays = 180,
): Date {
  const date = new Date();

  date.setDate(
    date.getDate() +
      randomNumber(minDays, maxDays),
  );

  return date;
}

export function randomPastDate(
  minDays = 1,
  maxDays = 60,
): Date {
  const date = new Date();

  date.setDate(
    date.getDate() -
      randomNumber(minDays, maxDays),
  );

  return date;
}

export function createAiSummary(
  title: string,
  category: string,
): string {
  return `${title} is a ${category.toLowerCase()} opportunity available through the POVOS Opportunity Intelligence Platform. Candidates should verify eligibility, important dates and official notifications before applying.`;
}

export function buildSearchText(
  values: string[],
): string {
  return values
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function buildMetadata(
  source: string,
) {
  return {
    source,
    seeded: true,
    version: '1.0.0',
    createdBy: 'POVOS Seeder',
    createdAt: new Date().toISOString(),
  };
}