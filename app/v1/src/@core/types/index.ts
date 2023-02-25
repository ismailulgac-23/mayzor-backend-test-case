import { User } from "@prisma/client";
import { Response } from "express";

export type IMakeProcess = {
  cb: () => Promise<any>
  errorMessage?: string
  res?: Response | undefined
}

export type IRequestContext = {
  user?: User | undefined
  token?: string | undefined
}