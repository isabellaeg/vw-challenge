export type Breed = {
  id: number;
  name: string;
  origin?: string;
  temperament?: string;
  life_span?: string;
  breed_group?: string;
  bred_for?: string;
  weight?: {
    imperial?: string;
    metric?: string;
  };
  height?: {
    imperial?: string;
    metric?: string;
  };
  image?: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
};

export interface ColumnDefinition<T> {
  key: keyof T;
  header: string;
}