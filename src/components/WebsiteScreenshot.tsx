'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Monitor, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WebsiteScreenshotProps {
  screenshotUrl: string;
  homepageUrl: string;
  domain: string;
}

export function WebsiteScreenshot({ screenshotUrl, homepageUrl, domain }: WebsiteScreenshotProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!screenshotUrl) {
    return null;
  }

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
          {/* Loading State */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Loading screenshot...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {imageError && (
            <div className="flex items-center justify-center bg-gray-50 p-8 sm:p-12">
              <div className="text-center">
                <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Screenshot unavailable</p>
                <p className="text-xs text-gray-500 mt-1">The screenshot link may have expired</p>
              </div>
            </div>
          )}

          {/* Screenshot Image */}
          <div className={`${imageLoaded ? 'block' : 'hidden'}`}>
            <div className="relative overflow-hidden" style={{ maxHeight: '600px' }}>
              <img
                src={screenshotUrl}
                alt={`Homepage screenshot of ${domain}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(false);
                }}
                className="w-full h-auto object-cover object-top"
                style={{ maxHeight: '600px' }}
              />
              {/* Fade overlay at bottom for long screenshots */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Screenshot Info */}
        <div className="mt-3 text-xs text-indigo-600 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-400 rounded-full" />
            Desktop view
          </span>
          <span className="text-indigo-500">
            Screenshot expires in 24 hours
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
