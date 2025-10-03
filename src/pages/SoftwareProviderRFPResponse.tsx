import React, { useState } from 'react';
import { FileText, Shield, DollarSign, Users, Clock, Settings, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SoftwareProviderRFPResponse: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',

    trialCommitment: '',
    implementationModel: '',
    customImplementationDetails: '',

    pricingModel: '',
    termsAndConditions: '',
    billingApproach: '',

    teamStructure: '',

    hasFedRAMP: false,
    otherCertifications: '',

    provisioningTimeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData = {
        trialCommitment: formData.trialCommitment,
        implementationModel: formData.implementationModel,
        customImplementationDetails: formData.customImplementationDetails,
        softwareLicense: {
          pricingModel: formData.pricingModel,
          termsAndConditions: formData.termsAndConditions,
          billingApproach: formData.billingApproach
        },
        teamStructure: formData.teamStructure,
        certifications: {
          hasFedRAMP: formData.hasFedRAMP,
          otherCertifications: formData.otherCertifications
        },
        provisioningTimeline: formData.provisioningTimeline
      };

      const { data, error } = await supabase
        .from('software_provider_submissions')
        .insert({
          company_name: formData.companyName,
          contact_person: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone || null,
          submission_data: submissionData
        })
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        trialCommitment: '',
        implementationModel: '',
        customImplementationDetails: '',
        pricingModel: '',
        termsAndConditions: '',
        billingApproach: '',
        teamStructure: '',
        hasFedRAMP: false,
        otherCertifications: '',
        provisioningTimeline: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting software provider RFP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const implementationOptions = [
    'Any integration vendor can implement',
    'Specific partner list (provide details below)',
    'Our team only (exclusive implementation)'
  ];

  return (
    <div className="bg-white">
      <section className="bg-mn-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Submit Software Provider RFP
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Submit your software product for consideration in the MES Modernization Challenge cupboard.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-primary rounded-full w-12 h-12 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Company Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Primary contact name"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-accent-teal rounded-full w-12 h-12 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Trial Commitment</h2>
              </div>

              <div>
                <label htmlFor="trialCommitment" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm your willingness to provide and support the software in trial or limited-use mode *
                </label>
                <textarea
                  id="trialCommitment"
                  name="trialCommitment"
                  required
                  rows={6}
                  value={formData.trialCommitment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                  placeholder="Describe your commitment to trial period support, limited-use licensing terms, and support availability during the innovation phase..."
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-accent-yellow rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-mn-primary" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Implementation Model</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="implementationModel" className="block text-sm font-medium text-gray-700 mb-2">
                    Who can implement your software? *
                  </label>
                  <select
                    id="implementationModel"
                    name="implementationModel"
                    required
                    value={formData.implementationModel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                  >
                    <option value="">Select implementation model</option>
                    {implementationOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {formData.implementationModel === 'Specific partner list (provide details below)' && (
                  <div>
                    <label htmlFor="customImplementationDetails" className="block text-sm font-medium text-gray-700 mb-2">
                      Provide partner list and details *
                    </label>
                    <textarea
                      id="customImplementationDetails"
                      name="customImplementationDetails"
                      required
                      rows={4}
                      value={formData.customImplementationDetails}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                      placeholder="List your implementation partners and any specific requirements or qualifications..."
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-primary rounded-full w-12 h-12 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Software License Agreement</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="pricingModel" className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing at scale with cost separation methodology *
                  </label>
                  <textarea
                    id="pricingModel"
                    name="pricingModel"
                    required
                    rows={4}
                    value={formData.pricingModel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Describe your pricing model, including how costs scale with usage, user count, or other metrics..."
                  />
                </div>

                <div>
                  <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700 mb-2">
                    Terms and conditions *
                  </label>
                  <textarea
                    id="termsAndConditions"
                    name="termsAndConditions"
                    required
                    rows={4}
                    value={formData.termsAndConditions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Summarize key terms and conditions of your software license agreement..."
                  />
                </div>

                <div>
                  <label htmlFor="billingApproach" className="block text-sm font-medium text-gray-700 mb-2">
                    Billing approach (monthly preferred) *
                  </label>
                  <textarea
                    id="billingApproach"
                    name="billingApproach"
                    required
                    rows={3}
                    value={formData.billingApproach}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Describe your billing frequency, payment terms, and any flexibility in billing arrangements..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-accent-brown rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Team Structure</h2>
              </div>

              <div>
                <label htmlFor="teamStructure" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum team structure required to support the software as part of implementing a single slice *
                </label>
                <textarea
                  id="teamStructure"
                  name="teamStructure"
                  required
                  rows={6}
                  value={formData.teamStructure}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                  placeholder="Describe the minimum team composition, required skill sets, and support responsibilities..."
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-accent-purple rounded-full w-12 h-12 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Certification & Security</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="hasFedRAMP"
                      name="hasFedRAMP"
                      type="checkbox"
                      checked={formData.hasFedRAMP}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-mn-accent-teal focus:ring-mn-accent-teal border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="hasFedRAMP" className="font-medium text-gray-700">
                      FedRAMP Certified
                    </label>
                    <p className="text-sm text-gray-500">Check if your software has FedRAMP certification</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="otherCertifications" className="block text-sm font-medium text-gray-700 mb-2">
                    Other relevant certifications and security compliance measures *
                  </label>
                  <textarea
                    id="otherCertifications"
                    name="otherCertifications"
                    required
                    rows={4}
                    value={formData.otherCertifications}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="List any other security certifications (SOC 2, ISO 27001, etc.) and compliance documentation..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-secondary rounded-full w-12 h-12 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Provisioning Timeline</h2>
              </div>

              <div>
                <label htmlFor="provisioningTimeline" className="block text-sm font-medium text-gray-700 mb-2">
                  Expected turnaround time for provisioning a new environment *
                </label>
                <input
                  type="text"
                  id="provisioningTimeline"
                  name="provisioningTimeline"
                  required
                  value={formData.provisioningTimeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                  placeholder="e.g., 'Immediate', '24 hours', '3-5 business days', etc."
                />
                <p className="mt-2 text-sm text-gray-500">
                  If the environment is available immediately upon provisioning the licenses, enter "Immediate" or "0".
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg">
                  Thank you for your submission! We will review your software provider RFP and contact you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                  There was an error submitting your response. Please try again or contact support.
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-4 bg-mn-secondary text-white font-semibold rounded-lg hover:bg-mn-accent-teal transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="mr-3 h-5 w-5" />
                {isSubmitting ? 'Submitting...' : 'Submit Software Provider RFP'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SoftwareProviderRFPResponse;
