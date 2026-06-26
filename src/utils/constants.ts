const tokenVar = process.env.TOKENVAR;

type UtilType = {
    tokenVar:string
}
export const utils = <UtilType>{
    tokenVar,
  }