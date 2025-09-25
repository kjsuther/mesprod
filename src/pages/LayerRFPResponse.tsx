import React, { useState } from 'react';
import { Settings, DollarSign, Users, FileText, Send } from 'lucide-react';

const LayerRFPResponse: React.FC = () => {
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    
    // Layer Capability
    layerCapability: '',
    customLayerCapability: '',
    
    // Definition of Done and SLAs
    definitionOfDone: '',
    slaCommitments: '',
    
    // Layer Support Team
    teamDescription: '',
    resume1: null as File | null,
    resume2: null as File | null,
    resume3: null as File | null,
    
    // Costs
    definitionOfDoneCost: '',
    monthlySupportCost: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, resumeField: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [resumeField]: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission and contract generation
    console.log('Form submitted:', formData);
    alert('Thank you for your submission! We will review your response and contact you soon.');
  };

  const layerOptions = [
    'Identity and Access Management (IAM)',
    'Data Integration and ETL',
    'API Gateway and Management',
    'Monitoring and Observability',
    'Security and Compliance',
    'Document Management',
    'Workflow and Business Process Management',
    'Notification and Communication Services',
    'Reporting and Analytics',
    'Audit and Logging',
    'Configuration Management',
    'Testing and Quality Assurance',
    'DevOps and CI/CD Pipeline',
    'Database Management and Optimization',
    'Caching and Performance Optimization',
    'Backup and Disaster Recovery',
    'Load Balancing and Scaling',
    'Custom/Other (specify below)'
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-mn-accent-brown text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Submit Layer RFP Response
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Propose your team and solution for delivering a specific layer capability of the MES modernization.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Company Information */}
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

            {/* Step 1: Layer Capability */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-accent-teal rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">1</span>
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Choose a Layer Capability</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="layerCapability" className="block text-sm font-medium text-gray-700 mb-2">
                    Select from enablement backlog or propose your own *
                  </label>
                  <select
                    id="layerCapability"
                    name="layerCapability"
                    required
                    value={formData.layerCapability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                  >
                    <option value="">Select a layer capability</option>
                    {layerOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                {formData.layerCapability === 'Custom/Other (specify below)' && (
                  <div>
                    <label htmlFor="customLayerCapability" className="block text-sm font-medium text-gray-700 mb-2">
                      Describe your proposed layer capability *
                    </label>
                    <textarea
                      id="customLayerCapability"
                      name="customLayerCapability"
                      required
                      rows={4}
                      value={formData.customLayerCapability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                      placeholder="Describe your custom layer capability and why it's important for the MES modernization..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Definition of Done and SLAs */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-secondary rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">2</span>
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Definition of Done and SLAs</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="definitionOfDone" className="block text-sm font-medium text-gray-700 mb-2">
                    Propose the definition of done for layer completion *
                  </label>
                  <textarea
                    id="definitionOfDone"
                    name="definitionOfDone"
                    required
                    rows={6}
                    value={formData.definitionOfDone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Define the specific criteria that must be met for this layer to be considered complete and ready for use..."
                  />
                </div>
                
                <div>
                  <label htmlFor="slaCommitments" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Level Agreements (SLAs) your team will support after delivery *
                  </label>
                  <textarea
                    id="slaCommitments"
                    name="slaCommitments"
                    required
                    rows={6}
                    value={formData.slaCommitments}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Specify the service level agreements including uptime, response times, support hours, escalation procedures, etc..."
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Layer Support Team */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-accent-yellow rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-mn-primary" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Describe Your Layer Support Team</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Why is your team best equipped to standardize and maintain a layer of the cake? *
                  </label>
                  <textarea
                    id="teamDescription"
                    name="teamDescription"
                    required
                    rows={6}
                    value={formData.teamDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Describe your team's experience with layer capabilities, standardization processes, ongoing maintenance, and what makes them uniquely qualified for this work..."
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-mn-primary mb-4">Layer Support Team Member Resumes (1-3 required)</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="resume1" className="block text-sm font-medium text-gray-700 mb-2">
                        Resume 1 *
                      </label>
                      <input
                        type="file"
                        id="resume1"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) => handleFileChange(e, 'resume1')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resume2" className="block text-sm font-medium text-gray-700 mb-2">
                        Resume 2
                      </label>
                      <input
                        type="file"
                        id="resume2"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'resume2')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resume3" className="block text-sm font-medium text-gray-700 mb-2">
                        Resume 3
                      </label>
                      <input
                        type="file"
                        id="resume3"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'resume3')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Costs */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-mn-accent-purple rounded-full w-12 h-12 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-mn-primary">Cost Information</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="definitionOfDoneCost" className="block text-sm font-medium text-gray-700 mb-2">
                    Cost to achieve the definition of done submitted *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="definitionOfDoneCost"
                      name="definitionOfDoneCost"
                      required
                      min="1"
                      value={formData.definitionOfDoneCost}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="monthlySupportCost" className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly cost to ensure continued support ongoing *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="monthlySupportCost"
                      name="monthlySupportCost"
                      required
                      min="1"
                      value={formData.monthlySupportCost}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-4 bg-mn-accent-brown text-white font-semibold rounded-lg hover:bg-mn-secondary transition-colors text-lg"
              >
                <Send className="mr-3 h-5 w-5" />
                Submit Layer RFP Response
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LayerRFPResponse;