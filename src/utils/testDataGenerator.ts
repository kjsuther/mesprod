export interface SoftwareProviderTestData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  productName: string;
  productDescription: string;
  trialCommitment: string;
  implementationModel: string;
  customImplementationDetails: string;
  licenseAgreementText: string;
  pricingModel: string;
  billingApproach: string;
  teamStructure: string;
  hasFedRAMP: boolean;
  otherCertifications: string;
  provisioningTimeline: string;
}

const companyNames = [
  'Acme Solutions',
  'TechVision Systems',
  'DataFlow Industries',
  'CloudScale Technologies',
  'Innovation Labs',
  'NextGen Software',
  'Enterprise Dynamics',
  'Digital Horizon',
  'Quantum Systems',
  'Velocity Tech'
];

const contactFirstNames = [
  'Sarah', 'Michael', 'Jennifer', 'David', 'Emily',
  'Robert', 'Jessica', 'James', 'Lisa', 'Christopher'
];

const contactLastNames = [
  'Johnson', 'Williams', 'Brown', 'Davis', 'Miller',
  'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas'
];

const productNames = [
  'MES Cloud Platform',
  'Enterprise Workflow Suite',
  'DataStream Manager',
  'Integration Hub Pro',
  'Compliance Tracker',
  'Process Automation Engine',
  'Digital Transformation Suite',
  'Smart Operations Platform',
  'Analytics Dashboard Pro',
  'Unified Management System'
];

const implementationOptions = [
  'Any integration vendor can implement',
  'Specific partner list (provide details below)',
  'Our team only (exclusive implementation)'
];

const provisioningTimelines = [
  'Immediate',
  '24 hours',
  '2-3 business days',
  '3-5 business days',
  '1 week',
  '2 weeks'
];

const certifications = [
  'SOC 2 Type II',
  'ISO 27001',
  'NIST 800-53',
  'HIPAA',
  'PCI DSS',
  'StateRAMP'
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

function generatePhoneNumber(): string {
  const areaCode = randomNumber(200, 999);
  const prefix = randomNumber(200, 999);
  const lineNumber = randomNumber(1000, 9999);
  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

function generateProductDescription(): string {
  const features = [
    'real-time data synchronization',
    'advanced analytics and reporting',
    'seamless API integration',
    'role-based access control',
    'automated workflow management',
    'compliance tracking and audit trails',
    'cloud-native architecture',
    'microservices-based design',
    'scalable infrastructure',
    'enterprise-grade security'
  ];

  const benefits = [
    'streamlines operations',
    'reduces manual processes',
    'improves data accuracy',
    'enhances decision-making',
    'accelerates digital transformation',
    'ensures regulatory compliance',
    'optimizes resource allocation',
    'increases operational efficiency'
  ];

  const selectedFeatures = [randomElement(features), randomElement(features), randomElement(features)];
  const selectedBenefit = randomElement(benefits);

  return `Our comprehensive MES solution provides ${selectedFeatures[0]}, ${selectedFeatures[1]}, and ${selectedFeatures[2]}. The platform is designed specifically for modernizing legacy systems and ${selectedBenefit}.\n\nBuilt on modern cloud infrastructure, our solution integrates seamlessly with existing systems while providing the flexibility needed for future enhancements. The system supports multiple deployment models and can be configured to meet specific state and federal compliance requirements.\n\nKey capabilities include comprehensive data management, automated processing workflows, and advanced reporting tools that provide real-time visibility into operations and performance metrics.`;
}

function generateTrialCommitment(): string {
  const duration = randomNumber(30, 180);
  const supportHours = randomElement(['8x5', '12x5', '24x7']);

  return `We are fully committed to providing trial and limited-use licensing for the MES Modernization Challenge innovation phase. Our trial commitment includes:\n\n1. Trial Period: ${duration}-day full-featured trial license with no functional limitations\n\n2. Support Coverage: ${supportHours} technical support during the trial period, including dedicated support engineer assignment and priority response times\n\n3. Training and Onboarding: Comprehensive onboarding sessions, user training materials, and access to our documentation portal\n\n4. Environment Setup: Assistance with environment configuration, data migration support, and integration guidance\n\n5. Regular Check-ins: Weekly progress reviews and quarterly business reviews to ensure successful evaluation and address any concerns\n\nOur team will provide continuous support throughout the innovation phase to ensure your team can fully evaluate our solution's capabilities and fit for the modernization initiative.`;
}

function generateCustomImplementationDetails(): string {
  const partnerCount = randomNumber(3, 8);

  return `Our certified implementation partner network includes ${partnerCount} qualified organizations with deep expertise in government MES implementations.\n\nPartner Requirements:\n- Minimum 5 years experience with Medicaid systems\n- Certified technicians with platform-specific training\n- Active government security clearances\n- Proven track record of successful implementations\n\nCurrent certified partners include regional system integrators and specialized government technology consultants. All partners maintain up-to-date certifications and undergo annual recertification to ensure quality standards.\n\nWe provide comprehensive partner enablement including technical training, implementation playbooks, and ongoing support to ensure consistent, high-quality implementations across all partner engagements.`;
}

function generateLicenseAgreement(): string {
  const userTier = randomNumber(50, 500);

  return `Standard Software License Agreement with the following key terms:\n\n- License Type: Subscription-based SaaS model\n- User Tiers: Starting at ${userTier} concurrent users with scalable pricing\n- Term: Annual subscription with monthly payment options\n- Support: Included standard support (${randomElement(['8x5', '12x5', '24x7'])} coverage)\n- Updates: Automatic updates and security patches included\n- Data Ownership: Customer retains full ownership of all data\n- Termination: 90-day notice period with data export assistance\n- Liability: Standard limitation of liability provisions\n- Compliance: Meets federal and state regulatory requirements\n- Service Level Agreement: 99.9% uptime guarantee with credits for non-compliance`;
}

function generatePricingModel(): string {
  const basePrice = randomNumber(5000, 25000);
  const perUserPrice = randomNumber(50, 200);

  return `Our pricing model is designed for transparency and scalability:\n\nBase Platform License: $${basePrice.toLocaleString()}/month\n- Includes core MES functionality, infrastructure, and standard support\n- Covers up to 100 concurrent users\n\nPer-User Pricing (above 100 users): $${perUserPrice}/user/month\n- Linear scaling with volume discounts at 500+ and 1,000+ user tiers\n- Separate pricing for administrative vs. standard users\n\nCost Separation Methodology:\n- Software License: ${randomNumber(60, 75)}% of total cost\n- Infrastructure/Hosting: ${randomNumber(15, 25)}% of total cost\n- Support Services: ${randomNumber(10, 15)}% of total cost\n\nAll pricing includes standard maintenance, updates, and security patches. Optional add-ons for premium support, advanced analytics, and custom integrations available separately.`;
}

function generateBillingApproach(): string {
  return `We offer flexible monthly billing to align with government procurement preferences:\n\nBilling Frequency: Monthly invoicing with net-30 payment terms\n\nPayment Options:\n- Direct monthly billing via invoice\n- ACH/wire transfer accepted\n- Government purchase cards (P-cards) accepted\n- Integration with state procurement systems available\n\nBilling Transparency:\n- Itemized monthly statements showing license, usage, and support costs\n- Detailed usage metrics and cost allocation reports\n- No hidden fees or surprise charges\n- Annual true-up process for user count adjustments\n\nFlexibility:\n- Month-to-month with annual commitment\n- Quarterly payment option available\n- Ability to adjust user counts with 30-day notice\n- Seasonal usage patterns accommodated\n\nOur billing system integrates with standard government accounting systems and provides detailed cost tracking for budget management and reporting purposes.`;
}

function generateTeamStructure(): string {
  const devs = randomNumber(2, 4);
  const support = randomNumber(1, 3);

  return `The minimum team structure required to support a single slice implementation includes:\n\nTechnical Team:\n- ${devs} Full-Stack Developers: Application development, customization, and integration work\n- ${support} DevOps Engineer(s): Infrastructure management, deployment, and monitoring\n- 1 QA Engineer: Testing, quality assurance, and validation\n\nSupport Team:\n- 1 Technical Support Specialist: End-user support and issue resolution\n- 1 Implementation Consultant (part-time): Configuration guidance and best practices\n\nManagement:\n- 1 Project Manager (part-time): Coordination, status reporting, and stakeholder communication\n\nSkill Sets Required:\n- Modern web application development (React, Node.js, cloud platforms)\n- Database management and optimization\n- API integration and web services\n- Government systems and compliance knowledge\n- Agile development methodologies\n\nThis team composition ensures adequate coverage for development, support, and ongoing maintenance while maintaining cost efficiency. Team members are cross-trained to provide backup coverage and flexibility as needs evolve throughout the implementation.`;
}

function generateCertifications(): string {
  const certList = [randomElement(certifications), randomElement(certifications), randomElement(certifications)];
  const uniqueCerts = [...new Set(certList)];

  return `Our comprehensive security and compliance certifications include:\n\nCertifications:\n${uniqueCerts.map(cert => `- ${cert} certified`).join('\n')}\n- Ongoing security audits conducted annually\n- Penetration testing performed quarterly\n\nSecurity Measures:\n- End-to-end encryption for data in transit and at rest\n- Multi-factor authentication (MFA) enforced\n- Role-based access control (RBAC) with granular permissions\n- Comprehensive audit logging and monitoring\n- Regular vulnerability scanning and patching\n- Incident response plan with 24/7 security operations center\n\nCompliance Documentation:\n- Complete compliance documentation package available\n- System Security Plan (SSP) maintained and updated\n- Privacy Impact Assessment (PIA) completed\n- Security assessment reports available upon request\n\nWe maintain strict adherence to federal and state security requirements and undergo regular third-party assessments to validate our security posture.`;
}

export function generateSoftwareProviderTestData(): SoftwareProviderTestData {
  const uniqueId = generateUniqueId();
  const firstName = randomElement(contactFirstNames);
  const lastName = randomElement(contactLastNames);
  const company = randomElement(companyNames);
  const product = randomElement(productNames);
  const implementationModel = randomElement(implementationOptions);

  return {
    companyName: `${company} (TEST)`,
    contactName: `${firstName} ${lastName} (TEST)`,
    contactEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.test.${uniqueId}@example.com`,
    contactPhone: generatePhoneNumber(),
    productName: `${product} (TEST)`,
    productDescription: generateProductDescription(),
    trialCommitment: generateTrialCommitment(),
    implementationModel: implementationModel,
    customImplementationDetails: implementationModel === 'Specific partner list (provide details below)'
      ? generateCustomImplementationDetails()
      : '',
    licenseAgreementText: generateLicenseAgreement(),
    pricingModel: generatePricingModel(),
    billingApproach: generateBillingApproach(),
    teamStructure: generateTeamStructure(),
    hasFedRAMP: Math.random() > 0.5,
    otherCertifications: generateCertifications(),
    provisioningTimeline: randomElement(provisioningTimelines)
  };
}
