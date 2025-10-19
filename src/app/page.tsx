'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PrivacyAnalyzer from '@/components/PrivacyAnalyzer';
import { AnalysisHistoryCards } from '@/components/AnalysisHistoryCards';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Privacy Awareness Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Your Privacy Matters
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Know What Apps Do With Your Data. Make Informed Choices.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Privacy policies are long, confusing, and full of legal jargon. We read them for you and explain
                what they really mean in simple language. Get instant privacy scores, understand your rights
                under India&rsquo;s DPDP Act 2023, and make better decisions about the apps you trust with your personal information.
              </p>

              {/* Privacy Policy Analyser - Moved to top */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Privacy Policy Analyser</h3>
                  <p className="text-sm text-slate-600">Enter any website or app privacy policy URL to get an instant AI-powered analysis</p>
                </div>
                <div id="analyzer">
                  <PrivacyAnalyzer />
                </div>
              </div>

              {/* Privacy Concerns - India Specific */}
              <div className="bg-orange-50 rounded-lg p-6 mb-8 border border-orange-200">
                <h3 className="text-lg font-bold text-orange-800 mb-4">Common Privacy Concerns in India:</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>Data Monetization:</strong> Payment apps, e-commerce, and food delivery services may sell your information to third parties</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>Identity & Financial Data:</strong> How is your Aadhaar, UPI, and banking information being used and stored?</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>Cross-Border Data Flow:</strong> Foreign apps storing Indian user data overseas without proper consent</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>Lack of Transparency:</strong> Complex policies hide how your data is shared and monetized</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Privacy Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Privacy Matters in India
            </h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              Your personal data is incredibly valuable. Companies monetize it, advertisers track you,
              and hackers want to steal it. India&rsquo;s DPDP Act 2023 gives you protection and rights.
              Here&rsquo;s what you need to know:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Your Data = Money</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  E-commerce platforms, payment apps, and online services make billions by selling your shopping habits,
                  transaction data, and personal preferences to advertisers. The DPDP Act now regulates this practice in India.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">24/7 Digital Surveillance</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Mobile apps track your location constantly. Food delivery, ride-hailing, and messaging services
                  monitor your contacts, movements, and communications. This data is rarely deleted.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🇮🇳</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Your Rights Under DPDP Act</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  India&rsquo;s DPDP Act 2023 gives you rights as a Data Principal - access your data, delete it,
                  correct errors, and refuse data sharing. The Data Protection Board will hear your complaints.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Analysis Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Do Popular Apps Handle Your Privacy?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Analyze privacy policies of apps and websites you use every day.
              Discover which ones comply with India&rsquo;s DPDP Act 2023 and which ones misuse your data.
            </p>
          </div>
          
          <AnalysisHistoryCards />
        </div>
      </section>
      
      {/* Privacy Protection Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Take Control of Your Digital Privacy
            </h2>
            <p className="text-lg text-slate-200 max-w-3xl mx-auto mb-10">
              Small changes can make a big difference. Simple tools and tips to protect your privacy in India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Digital Footprint Check</h3>
                <p className="text-slate-400 mb-4 text-sm">
                  See exactly what information your browser reveals to every website you visit.
                </p>
                <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700" asChild>
                  <Link href="/digital-fingerprint">Check Now →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Privacy Education</h3>
                <p className="text-slate-400 mb-4 text-sm">
                  Learn how privacy policies work and what to look for when reading them.
                </p>
                <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700" asChild>
                  <Link href="/methodology">Learn More →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Support Privacy Rights</h3>
                <p className="text-slate-400 mb-4 text-sm">
                  Help us build better privacy tools and spread awareness about digital rights.
                </p>
                <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700" asChild>
                  <Link href="/support">Get Involved →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Privacy Tips - India Specific */}
          <div className="mt-16 bg-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Quick Privacy Tips for Indian Users</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Review Payment App Permissions</h4>
                  <p className="text-slate-300 text-sm">
                    Payment and UPI apps don&rsquo;t need access to your location, contacts, or SMS.
                    Go to your phone settings and disable unnecessary permissions for better privacy.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Be Careful with Aadhaar Linking</h4>
                  <p className="text-slate-300 text-sm">
                    Not every app or website needs your Aadhaar. Only link it to services with legal requirements.
                    The DPDP Act protects you from excessive Aadhaar linking practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Check Data Storage Location</h4>
                  <p className="text-slate-300 text-sm">
                    Under DPDP Act, you have the right to know where your data is stored. Foreign apps should
                    disclose if they store Indian user data overseas. Use our analyzer to check.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Exercise Your Right to Delete Data</h4>
                  <p className="text-slate-300 text-sm">
                    For apps you no longer use, the DPDP Act gives you the right to request data deletion.
                    Contact the app&rsquo;s grievance officer to exercise this right.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
