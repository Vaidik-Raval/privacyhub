'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Monitor, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WebsiteScreenshotProps {
  screenshotUrl: string;
  homepageUrl: string;
  domain: string;
  compact?: boolean;
}

export function WebsiteScreenshot({ screenshotUrl, homepageUrl, domain, compact = false }: WebsiteScreenshotProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasScreenshot = screenshotUrl && screenshotUrl.length > 0;

  // Compact thumbnail version
  if (compact) {
    return (
      <div className="flex flex-col items-center">
        <a
          href={homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          title={`Visit ${domain}`}
        >
          <div className="relative w-32 h-24 rounded-lg overflow-hidden border-2 border-indigo-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            {!hasScreenshot || imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
                <span className="text-[10px] font-medium text-gray-500">N/A</span>
              </div>
            ) : (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-200 border-t-indigo-600" />
                  </div>
                )}
                <img
                  src={screenshotUrl}
                  alt={`${domain} homepage`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(false);
                  }}
                  className={`w-full h-full object-cover object-top ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              </>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 rounded p-1">
                <ExternalLink className="h-3 w-3 text-indigo-600" />
              </div>
            </div>
          </div>
        </a>
        <p className="text-xs text-center text-gray-700 mt-2 font-semibold">
          Website Preview
        </p>
      </div>
    );
  }

  // Full card version
  return (
    <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-indigo-100 rounded-full p-2.5">
            <Monitor className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-black text-indigo-900 mb-1">
              Website Preview
            </h4>
            <p className="text-xs sm:text-sm text-indigo-700">
              Homepage snapshot of {domain}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-indigo-300 text-indigo-700 hover:bg-indigo-100 text-xs sm:text-sm"
            asChild
          >
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Visit Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        {/* Screenshot Container */}
        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl border-2 border-indigo-100">
          {!hasScreenshot || imageError ? (
            /* N/A State - No Screenshot Available */
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-12 sm:p-16 min-h-[300px]">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">Screenshot Not Available</p>
                <p className="text-sm text-gray-500 max-w-md">
                  {imageError ? 'Screenshot link expired or failed to load' : 'Screenshot could not be captured during analysis'}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-gray-600">N/A</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Loading State */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Loading screenshot...</p>
                  </div>
                </div>
              )}

              {/* Screenshot Image */}
              <div className={`${imageLoaded ? 'block' : 'hidden'}`}>
                <div className="relative overflow-hidden" style={{ maxHeight: '500px' }}>
                  <img
                    src={screenshotUrl}
                    alt={`Homepage screenshot of ${domain}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setImageError(true);
                      setImageLoaded(false);
                    }}
                    className="w-full h-auto object-cover object-top"
                    style={{ maxHeight: '500px' }}
                  />
                  {/* Fade overlay at bottom for long screenshots */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Screenshot Info */}
        {hasScreenshot && !imageError && (
          <div className="mt-3 text-xs text-indigo-600 flex items-center justify-between flex-wrap gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              <span className="font-medium">Desktop view</span>
            </span>
            <span className="text-indigo-500">
              {screenshotUrl.startsWith('data:') ? 'Inline screenshot' : 'Expires in 24 hours'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
