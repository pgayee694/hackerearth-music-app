type ClassProperties<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
}[keyof T];

export type GetActionsFromClass<T extends Record<string, any>> = ReturnType<
  Extract<ClassProperties<T>, (...args: any) => { type: string }>
>;
