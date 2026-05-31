type ClassValue = string | undefined | false | null | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat(Infinity as 10)
    .filter(Boolean)
    .join(" ");
}
