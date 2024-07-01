 interface Photo {
  title: string;
  description: string;
  image: string;
  index: number;
}


interface Photos {
  [key: string]: Photo;
}

export type { Photo, Photos };