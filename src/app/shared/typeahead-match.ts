export interface TypeaheadMatch {
  item: { name: string; count: number } & Record<string, unknown>;
}
