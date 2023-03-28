#!/usr/bin/env node
import * as dotenv from "dotenv";
import { library } from "genai-lib";

dotenv.config();

const GCP_API_KEY = process.env.GCP_API_KEY;

library(GCP_API_KEY);
