export interface OriginalFile {
  _id: string;
  name: string;
  createdAt: string;
  size: string;
  openUrl: string;
}

export interface GeneratedFile {
  _id: string;
  name: string;
  pages: number[];
  createdAt: string;
  size: string;
  downloadUrl: string;
}