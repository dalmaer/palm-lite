/**
 * This scripts generates PaLM API types from the Google Discover doc.
 */

import { config } from "dotenv";
import { render } from "discovery-to-types";
import { writeFile } from "fs/promises";

config();

const DISCOVER_DOC_URL =
  "https://generativelanguage.googleapis.com/$discovery/rest?version=v1beta2";
const { API_KEY } = process.env;
if (!API_KEY) throw new Error("API_KEY is not defined");

const response = await fetch(`${DISCOVER_DOC_URL}&key=${API_KEY}`);
const doc = await response.json();
const types = await render(doc);
const preamble = `/**
* This file was generated by scripts/make-types.js on ${new Date().toISOString()}
* Do not edit this file manually.
*/

`;
await writeFile("./core/library/src/types.ts", `${preamble}${types}`);
