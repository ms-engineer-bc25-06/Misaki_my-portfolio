// src/types/express/index.d.ts
import { Request as ExpressRequest } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

// Request に uid と user を追加した拡張型を作る
export interface RequestWithUser extends ExpressRequest {
  uid?: string;
  user?: DecodedIdToken;
}
