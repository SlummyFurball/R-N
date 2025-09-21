import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle } from 'lucide-react';
import { formatPrice, createWhatsAppUrl } from '../utils/formatters';

const MortgageCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const calculations = useMemo(() => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    
    // Additional costs (estimates)
    const insurance = monthlyPayment * 0.1; // 10% of monthly payment
    const taxes = (propertyPrice * 0.01) / 12; // 1% annually divided by 12 months
    const totalMonthlyPayment = monthlyPayment + insurance + taxes;
    
    return {
      principal,
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      insurance,
      taxes,
      totalMonthlyPayment: isNaN(totalMonthlyPayment) ? 0 : totalMonthlyPayment,
      downPaymentPercent: (downPayment / propertyPrice) * 100
    };
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const handleWhatsAppConsult = () => {
    const message = `Hola, me interesa una consulta sobre financiamiento hipotecario:

Precio de propiedad: ${formatPrice(propertyPrice, 'USD')}
Inicial: ${formatPrice(downPayment, 'USD')} (${calculations.downPaymentPercent.toFixed(1)}%)
Tasa de interés: ${interestRate}%
Plazo: ${loanTerm} años

Cuota mensual estimada: ${formatPrice(calculations.totalMonthlyPayment, 'USD')}

Me gustaría obtener más información sobre opciones de financiamiento.`;
    
    const whatsappUrl = createWhatsAppUrl('+1-809-798-5428', message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-[#f4f4f2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculadora de{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Hipoteca
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Calcula tu cuota mensual y planifica tu inversión inmobiliaria
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calculator className="mr-2" size={24} />
                Parámetros del Préstamo
              </h3>

              {/* Property Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio de la Propiedad
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="5000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="text-lg font-semibold text-[#002430]">
                  {formatPrice(propertyPrice, 'USD')}
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inicial ({calculations.downPaymentPercent.toFixed(1)}%)
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    min="10000"
                    max={propertyPrice * 0.5}
                    step="5000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="text-lg font-semibold text-[#002430]">
                  {formatPrice(downPayment, 'USD')}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tasa de Interés Anual
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="text-lg font-semibold text-[#002430]">
                  {interestRate.toFixed(1)}%
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plazo del Préstamo
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="text-lg font-semibold text-[#002430]">
                  {loanTerm} años
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#002430] text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Resumen del Préstamo</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-600">
                  <span>Monto a Financiar:</span>
                  <span className="font-semibold">
                    {formatPrice(calculations.principal, 'USD')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-600">
                  <span>Cuota Base:</span>
                  <span className="font-semibold">
                    {formatPrice(calculations.monthlyPayment, 'USD')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-600">
                  <span>Seguro (estimado):</span>
                  <span className="font-semibold">
                    {formatPrice(calculations.insurance, 'USD')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-600">
                  <span>Impuestos (estimado):</span>
                  <span className="font-semibold">
                    {formatPrice(calculations.taxes, 'USD')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 bg-yellow-600 -mx-6 px-6 rounded">
                  <span className="font-bold text-lg">Cuota Total Mensual:</span>
                  <span className="font-bold text-lg">
                    {formatPrice(calculations.totalMonthlyPayment, 'USD')}
                  </span>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-600 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total a Pagar:</span>
                    <span>{formatPrice(calculations.totalPayment + downPayment, 'USD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Intereses:</span>
                    <span>{formatPrice(calculations.totalInterest, 'USD')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> Los cálculos mostrados son estimaciones. Las tasas de interés, 
              seguros e impuestos pueden variar según el banco y las características específicas de la propiedad. 
              Contáctanos para obtener una cotización personalizada y precisa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;