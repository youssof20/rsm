export type Ref = { doc: 'rsm' | 'thesis'; page: number; end?: number };
export type Kind = 'Background concept' | 'Source reading' | 'Interpretation' | 'Educational workflow';
export type Section = { title: string; body: string[]; refs?: Ref[]; kind?: Kind; deeper?: string; confusion?: string; equation?: string; symbols?: string[] };
export type Lesson = { id: string; group: string; title: string; subtitle: string; minutes: number; kind: Kind; prerequisites?: string[]; diagram?: string; sections: Section[]; takeaways: [string,string,string]; recall: string; answer: string };
export const R = (page: number, end?: number): Ref => ({doc:'rsm',page,end});
export const T = (page: number, end?: number): Ref => ({doc:'thesis',page,end});
