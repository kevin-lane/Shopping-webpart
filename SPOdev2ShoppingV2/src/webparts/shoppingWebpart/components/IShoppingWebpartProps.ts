import { SPHttpClient } from "@microsoft/sp-http";

export interface IShoppingWebpartProps {
  description: string;
  //list: ISPList[];
  products: ISPList[];
  siteUrl: string;
  spHttpClient: SPHttpClient;
}

export interface ISPLists{
  value: ISPList[];
}
export interface ISPList{
  Id:string;
  Title: string;
  ECWS_x002e_Category: string; 
  ECWS_x002e_Price: number;
  //ProductDescription: string;
  Picture:string;
}