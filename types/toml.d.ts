declare module 'toml' {
  export function parse(content: string): any;
  export function stringify(obj: any): string;
} 