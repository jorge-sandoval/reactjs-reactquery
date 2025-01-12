import { BaseModel } from "./base";

export interface Post extends BaseModel {
  title: string;
  body: string;
  userId: string;
}