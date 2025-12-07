export type products = {
"id":number,
"Name": string,
"Brand": string,
"Year": string,
"rating": string,
"Country": string,
"Image": string,
"Gender": string,
"Price": number,
"countInStock" : number
}

export interface FeatureItemProps {
  iconPath: string;
  text: string;
}

export interface CategoryColumnProps {
  title: string;
  links: string[]; // links is an array of strings
}
