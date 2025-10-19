/**
 * Cloudflare Workers TypeScript Definitions
 * Extends Next.js Request with Cloudflare-specific bindings
 */

import type { D1Database } from '@/lib/d1-database';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENROUTER_API?: string;
      FIRECRAWL_API_KEY?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

/**
 * Cloudflare Workers KV namespace
 */
export interface KVNamespace {
  get(key: string, options?: { type: 'text' }): Promise<string | null>;
  get(key: string, options: { type: 'json' }): Promise<unknown | null>;
  get(key: string, options: { type: 'arrayBuffer' }): Promise<ArrayBuffer | null>;
  get(key: string, options: { type: 'stream' }): Promise<ReadableStream | null>;
  put(key: string, value: string | ArrayBuffer | ReadableStream, options?: KVPutOptions): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: KVListOptions): Promise<KVListResult>;
}

export interface KVPutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: Record<string, unknown>;
}

export interface KVListOptions {
  prefix?: string;
  limit?: number;
  cursor?: string;
}

export interface KVListResult {
  keys: Array<{
    name: string;
    expiration?: number;
    metadata?: Record<string, unknown>;
  }>;
  list_complete: boolean;
  cursor?: string;
}

/**
 * Cloudflare environment bindings
 */
export interface CloudflareEnv {
  "an-db": D1Database;
  CACHE?: KVNamespace;
  OPENROUTER_API: string;
  OPENROUTER_API_1?: string;
  OPENROUTER_API_2?: string;
  FIRECRAWL_API_KEY?: string;
}

/**
 * Extended Next.js Request with Cloudflare context
 */
export interface CloudflareRequest extends Request {
  env?: CloudflareEnv;
  cf?: IncomingRequestCfProperties;
}

/**
 * Cloudflare request properties
 */
export interface IncomingRequestCfProperties {
  asn?: number;
  asOrganization?: string;
  colo?: string;
  city?: string;
  continent?: string;
  country?: string;
  httpProtocol?: string;
  latitude?: string;
  longitude?: string;
  postalCode?: string;
  metroCode?: string;
  region?: string;
  regionCode?: string;
  requestPriority?: string;
  timezone?: string;
  tlsVersion?: string;
  tlsClientAuth?: {
    certIssuerDNLegacy?: string;
    certIssuerDN?: string;
    certPresented?: '0' | '1';
    certSubjectDNLegacy?: string;
    certSubjectDN?: string;
    certNotBefore?: string;
    certNotAfter?: string;
    certSerial?: string;
    certFingerprintSHA1?: string;
    certFingerprintSHA256?: string;
    certVerified?: string;
  };
}

/**
 * Helper to get D1 database from request
 */
export function getDB(request: Request): D1Database | null {
  const cfRequest = request as CloudflareRequest;
  return cfRequest.env?.["an-db"] || null;
}

/**
 * Helper to get KV cache from request
 */
export function getCache(request: Request): KVNamespace | null {
  const cfRequest = request as CloudflareRequest;
  return cfRequest.env?.CACHE || null;
}

export {};
