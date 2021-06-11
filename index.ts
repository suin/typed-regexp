export default function typedRegExp<T extends string>(
  pattern: T,
  flags?: string
): Names<T> extends string
  ? TypedRegExp<{ [K in Names<T>]?: string }>
  : RegExp {
  return new RegExp(pattern, flags) as any;
}

export interface TypedRegExp<T extends { [K in string]?: string }>
  extends Omit<RegExp, "exec"> {
  exec(string: string): { groups: T } | null;
}

type Names<T extends string> = string extends T
  ? never
  : T extends `${infer _}(?<${infer Name}>${infer Rest}`
  ? Rest extends ""
    ? Name
    : Name | Names<Rest>
  : never;
