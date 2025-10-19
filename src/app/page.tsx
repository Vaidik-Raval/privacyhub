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
                कोई भी Privacy Policy नहीं पढ़ता। हम पढ़ते हैं। आपके लिए।
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                सच कहें तो—आपने कभी कोई privacy policy नहीं पढ़ी। किसी ने नहीं पढ़ी।
                लेकिन आपको जानने का हक है कि Paytm, PhonePe, Swiggy जैसे apps आपके data के साथ क्या कर रहे हैं।
                India&rsquo;s DPDP Act 2023 के तहत, हम आपके लिए fine print analyze करते हैं।
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
                <h3 className="text-lg font-bold text-orange-800 mb-4">भारत में आम Privacy Concerns:</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>Data Selling:</strong> Payment apps, food delivery, और shopping apps आपकी information बेच सकते हैं</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>Aadhaar & UPI Data:</strong> आपकी financial और identity information कैसे use हो रही है?</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>WhatsApp Sharing:</strong> Meta (Facebook) के साथ data sharing की hidden policies</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-orange-700"><strong>Chinese Apps:</strong> Foreign apps storing Indian user data overseas without consent</span>
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
              भारत में Privacy क्यों Important है?
            </h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              आपका personal data बहुत valuable है। Indian और foreign companies इसे बेचकर पैसा कमाती हैं,
              governments surveillance के लिए use करती हैं, और hackers इसे चुराना चाहते हैं। DPDP Act 2023
              आपको protection देता है - जानिए कैसे:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">आपका Data = पैसा</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Flipkart, Amazon, Paytm, PhonePe - सभी आपकी shopping habits, UPI transactions,
                  और personal preferences को advertisers को बेचकर अरबों कमाते हैं। DPDP Act अब इसे regulate करता है।
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">24/7 Tracking</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ola, Uber, Swiggy, Zomato - ये apps आपकी हर location track करते हैं। WhatsApp आपके contacts
                  और messages monitor करता है। यह data कभी delete नहीं होता।
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🇮🇳</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">आपके अधिकार (DPDP Act)</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  DPDP Act 2023 आपको Data Principal के रूप में rights देता है - अपना data देखें, delete करें,
                  correct करें, और sharing से मना करें। Data Protection Board आपकी complaints सुनेगा।
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
              Popular Indian Apps की Privacy कैसी है?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Paytm, PhonePe, Swiggy, Zomato, Flipkart - रोज use होने वाले apps की privacy policies का analysis।
              पता करें कौन apps DPDP Act follow करते हैं और कौन आपका data misuse करते हैं।
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
              अपनी Digital Privacy को Control करें
            </h2>
            <p className="text-lg text-slate-200 max-w-3xl mx-auto mb-10">
              छोटे changes से बड़ा फर्क पड़ता है। भारत में digital privacy protect करने के simple tools और tips।
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
            <h3 className="text-2xl font-bold text-white text-center mb-8">भारतीय Users के लिए Privacy Tips</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">UPI और Payment Apps में Permissions Check करें</h4>
                  <p className="text-slate-300 text-sm">
                    PhonePe, Paytm, Google Pay को location, contacts, और SMS access की जरूरत नहीं। Settings में जाकर
                    unnecessary permissions band करें।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Aadhaar Linking सोच समझकर करें</h4>
                  <p className="text-slate-300 text-sm">
                    हर app या website को Aadhaar link करने की जरूरत नहीं। सिर्फ legal requirement वाले services के लिए ही link करें।
                    DPDP Act आपको excessive Aadhaar linking से protect करता है।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Foreign Apps की Privacy Policy पढ़ें</h4>
                  <p className="text-slate-300 text-sm">
                    Chinese apps, social media platforms - क्या वे आपका data India में store करते हैं? DPDP Act के तहत
                    यह जानना आपका अधिकार है। Analysis करवाएं हमसे।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Data Deletion का Right Use करें</h4>
                  <p className="text-slate-300 text-sm">
                    Swiggy, Zomato, Ola से जो apps अब use नहीं करते, उनसे अपना data delete करवाने का right DPDP Act देता है।
                    Grievance officer को email करें।
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
