import { Photo } from "@/lib/api/types";

export type ImageStateType = {
  data: Photo[] | null;
  loading: boolean;
    error: string | undefined;
  active?: number;
};
