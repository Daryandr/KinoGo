export type Film = {
  _id: string,
  type: string,
  name: string,
  description: string,
  year: number,
  alternativeName: string,
  movieLength: number,
  shortDescription: string,
  poster: string,
  rating:{
    kp: number,
    imdb: number,
    filmCritics: number,
  },
  votes:{
    kp: number,
    imdb: number,
    filmCritics: number,
  },
  watchability:[
    {
      _id: string,
      logo: string,
      name: string,
      url: string
    }
  ]
}
