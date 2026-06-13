type ClassValue = string | undefined | false | null | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat(Infinity as 10)
    .filter(Boolean)
    .join(" ");
}

export function cleanImageUrl(url: string | undefined | null): string {
  if (!url) return "";
  let trimmed = url.trim();

  // Handle Google Drive Links
  if (trimmed.includes("drive.google.com")) {
    let fileId = "";
    // Match /file/d/FILE_ID/
    const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      fileId = fileDMatch[1];
    } else {
      // Match id=FILE_ID
      const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // Handle Dropbox Links
  if (trimmed.includes("dropbox.com")) {
    if (trimmed.includes("dl=0")) {
      return trimmed.replace("dl=0", "raw=1");
    } else if (!trimmed.includes("raw=1") && !trimmed.includes("dl=1")) {
      return trimmed + (trimmed.includes("?") ? "&raw=1" : "?raw=1");
    }
  }

  return trimmed;
}
