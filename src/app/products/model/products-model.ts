export interface productData {
  "id": number,
  "title": string,
  "description": string,
  "price": number,
  "rating":Rating 
  "category": string,
  "image": Array<string>
}
export interface Rating{
  "rate": number,
  "count": number
}

export interface Category{
  "name": string,
  "active": boolean
}


