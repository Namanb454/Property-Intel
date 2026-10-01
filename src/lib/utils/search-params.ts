/** The first value of a search param that may be repeated (`?tag=a&tag=b`). */
export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
