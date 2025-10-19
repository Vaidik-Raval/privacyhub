'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Calculator, Scale, Shield, Users, Lock, Eye, FileText, Info } from 'lucide-react';

export function MethodologySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    {
      name: 'Data Minimization & Collection',
      weight: 30,
      icon: <Shield className="h-5 w-5" />,
      description: 'Evaluates data collection scope, legal basis clarity, purpose specification, and sensitive data handling per DPDP Act 2023',
      criteria: [
        'Collection limited to necessary data for stated purposes',
        'Clear lawful basis identification (DPDP Act Sec. 6)',
        'Specific vs. vague purpose statements',
        'Sensitive personal data protections (DPDP Act Sec. 9)',
        'Children\'s data compliance (DPDP Act Sec. 9)',
        'Notice and consent mechanisms per DPDP Act requirements',
        'Data fiduciary obligations and transparency'
      ]
    },
    {
      name: 'Third-Party Data Sharing',
      weight: 25,
      icon: <Users className="h-5 w-5" />,
      description: 'Assesses data fiduciary/processor relationships and international transfer mechanisms per DPDP Act requirements',
      criteria: [
        'Sharing scope and commercial exploitation',
        'International transfer compliance (DPDP Act Sec. 16)',
        'Data processor agreements (DPDP Act Sec. 8)',
        'Granular consent mechanisms',
        'User awareness of data monetization',
        'Cross-border transfer compliance with DPDP Act restricted countries',
        'Consent Managers and compliance framework'
      ]
    },
    {
      name: 'Individual Rights & Controls',
      weight: 20,
      icon: <Scale className="h-5 w-5" />,
      description: 'Evaluates DPDP Act Chapter IV Data Principal rights implementation and user control mechanisms',
      criteria: [
        'Data access rights (DPDP Act Sec. 11)',
        'Correction and updation processes (DPDP Act Sec. 12)',
        'Right to erasure and data deletion (DPDP Act Sec. 12)',
        'Data portability mechanisms',
        'Objection and opt-out mechanisms',
        'Withdrawal of consent (DPDP Act Sec. 7)',
        'Grievance redressal mechanisms (DPDP Act Sec. 32)',
        'Nomination facility for deceased users (DPDP Act Sec. 13)'
      ]
    },
    {
      name: 'Security & Risk Management',
      weight: 15,
      icon: <Lock className="h-5 w-5" />,
      description: 'Technical and organizational measures assessment per DPDP Act Sec. 8',
      criteria: [
        'Encryption standards (end-to-end, in-transit, at-rest)',
        'Access controls and multi-factor authentication',
        'Incident response and breach notification',
        'Privacy impact assessments',
        'Data retention and deletion schedules',
        'Data localization compliance for India',
        'Reasonable security safeguards (DPDP Act Sec. 8)'
      ]
    },
    {
      name: 'Regulatory Compliance',
      weight: 7,
      icon: <FileText className="h-5 w-5" />,
      description: 'India DPDP Act 2023 compliance evaluation and Data Protection Board requirements',
      criteria: [
        'DPDP Act 2023 compliance (Indian users)',
        'Data Principal rights implementation',
        'Data fiduciary obligations fulfillment',
        'Consent Manager integration readiness',
        'Data Protection Board registration (DPDP Act Sec. 25)',
        'Significant Data Fiduciary classification compliance'
      ]
    },
    {
      name: 'Transparency & Communication',
      weight: 3,
      icon: <Eye className="h-5 w-5" />,
      description: 'Information quality and accessibility assessment per DPDP Act transparency requirements',
      criteria: [
        'Plain language usage and readability',
        'Layered notices and mobile optimization',
        'Proactive change notifications',
        'Grievance officer details (DPDP Act requirement)',
        'Vernacular language support for Indian languages',
        'Accessibility for persons with disabilities',
        'Clear data fiduciary identification'
      ]
    }
  ];

  const riskLevels = [
    { level: 'EXEMPLARY (9-10)', color: 'bg-green-100 text-green-800', description: 'Privacy-by-design implementation, exceeds regulatory minimums' },
    { level: 'LOW RISK (8-9)', color: 'bg-blue-100 text-blue-800', description: 'Strong privacy framework with minor gaps' },
    { level: 'MODERATE (6-7)', color: 'bg-yellow-100 text-yellow-800', description: 'Some privacy protections present, areas for improvement' },
    { level: 'MODERATE-HIGH (4-5)', color: 'bg-orange-100 text-orange-800', description: 'Multiple compliance gaps, user privacy compromised' },
    { level: 'HIGH RISK (1-3)', color: 'bg-red-100 text-red-800', description: 'Significant privacy violations likely, regulatory action probable' }
  ];

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-900">Analysis Methodology</h4>
              <p className="text-sm text-blue-700">India DPDP Act 2023 focused privacy assessment framework</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-700 hover:bg-blue-100"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>

        {/* Quick Overview */}
        <div className="mb-6">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-blue-700">Assessment Categories</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">90+</div>
              <div className="text-sm text-blue-700">Privacy Criteria</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-blue-700">Risk Levels</div>
            </div>
          </div>

          {/* Category Weights Overview */}
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h5 className="font-semibold text-blue-900 mb-3">Weighted Scoring Framework</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">{category.name}</span>
                  <Badge variant="outline" className="text-blue-600 border-blue-300">
                    {category.weight}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Methodology */}
        {isExpanded && (
          <div className="space-y-6">
            {/* Scoring Categories */}
            <div>
              <h5 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Assessment Categories
              </h5>
              <div className="grid gap-4">
                {categories.map((category, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded">
                          {category.icon}
                        </div>
                        <div>
                          <h6 className="font-semibold text-blue-900">{category.name}</h6>
                          <p className="text-sm text-blue-700">{category.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {category.weight}% Weight
                      </Badge>
                    </div>
                    <div className="ml-11">
                      <p className="text-xs text-blue-600 mb-2">Key Evaluation Criteria:</p>
                      <ul className="text-xs text-blue-700 space-y-1">
                        {category.criteria.map((criterion, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Classification */}
            <div>
              <h5 className="text-lg font-semibold text-blue-900 mb-4">Risk Classification System</h5>
              <div className="space-y-2">
                {riskLevels.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border border-blue-200">
                    <Badge className={`${risk.color} font-medium`}>
                      {risk.level}
                    </Badge>
                    <span className="text-sm text-blue-700 flex-1 ml-4">{risk.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory Framework */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h5 className="text-lg font-semibold text-blue-900 mb-3">Regulatory Framework</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h6 className="font-medium text-blue-800 mb-2">Primary Regulation</h6>
                  <ul className="space-y-1 text-blue-700">
                    <li>• DPDP Act 2023 (Digital Personal Data Protection Act, India)</li>
                    <li>• IT Act 2000 (Information Technology Act)</li>
                    <li>• IT Rules 2011 (Reasonable Security Practices)</li>
                    <li>• Consumer Protection Act 2019</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-blue-800 mb-2">Industry Standards</h6>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Privacy-by-Design Principles</li>
                    <li>• ISO/IEC 27001 Security Framework</li>
                    <li>• CERT-In Guidelines</li>
                    <li>• Fair Information Practice Principles</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
                <p className="text-xs text-amber-900">
                  <strong>Note:</strong> DPDP Act 2023 compliance analysis is indicative based on the current provisions of the Act.
                  The Act is not yet fully active or enforced. Final rules and implementation guidelines are pending from the Data Protection Board of India.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}