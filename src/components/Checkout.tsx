import { useState } from "react";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PaymentGateway } from "@/components/PaymentGateway";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

export const Checkout = () => {
  const { toast } = useToast();
  const { cartItems, getTotalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedCountry, setSelectedCountry] = useState("US");

  // World countries list
  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "NL", name: "Netherlands" },
    { code: "BE", name: "Belgium" },
    { code: "CH", name: "Switzerland" },
    { code: "AT", name: "Austria" },
    { code: "SE", name: "Sweden" },
    { code: "NO", name: "Norway" },
    { code: "DK", name: "Denmark" },
    { code: "FI", name: "Finland" },
    { code: "IE", name: "Ireland" },
    { code: "PT", name: "Portugal" },
    { code: "PL", name: "Poland" },
    { code: "CZ", name: "Czech Republic" },
    { code: "HU", name: "Hungary" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "HR", name: "Croatia" },
    { code: "RO", name: "Romania" },
    { code: "BG", name: "Bulgaria" },
    { code: "GR", name: "Greece" },
    { code: "CY", name: "Cyprus" },
    { code: "MT", name: "Malta" },
    { code: "LU", name: "Luxembourg" },
    { code: "IS", name: "Iceland" },
    { code: "LI", name: "Liechtenstein" },
    { code: "MC", name: "Monaco" },
    { code: "SM", name: "San Marino" },
    { code: "VA", name: "Vatican City" },
    { code: "AD", name: "Andorra" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "CN", name: "China" },
    { code: "HK", name: "Hong Kong" },
    { code: "TW", name: "Taiwan" },
    { code: "SG", name: "Singapore" },
    { code: "MY", name: "Malaysia" },
    { code: "TH", name: "Thailand" },
    { code: "PH", name: "Philippines" },
    { code: "ID", name: "Indonesia" },
    { code: "VN", name: "Vietnam" },
    { code: "IN", name: "India" },
    { code: "PK", name: "Pakistan" },
    { code: "BD", name: "Bangladesh" },
    { code: "LK", name: "Sri Lanka" },
    { code: "MV", name: "Maldives" },
    { code: "NP", name: "Nepal" },
    { code: "BT", name: "Bhutan" },
    { code: "MM", name: "Myanmar" },
    { code: "KH", name: "Cambodia" },
    { code: "LA", name: "Laos" },
    { code: "BN", name: "Brunei" },
    { code: "TL", name: "Timor-Leste" },
    { code: "MN", name: "Mongolia" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TM", name: "Turkmenistan" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "AF", name: "Afghanistan" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "SY", name: "Syria" },
    { code: "LB", name: "Lebanon" },
    { code: "JO", name: "Jordan" },
    { code: "IL", name: "Israel" },
    { code: "PS", name: "Palestine" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "QA", name: "Qatar" },
    { code: "BH", name: "Bahrain" },
    { code: "KW", name: "Kuwait" },
    { code: "OM", name: "Oman" },
    { code: "YE", name: "Yemen" },
    { code: "TR", name: "Turkey" },
    { code: "GE", name: "Georgia" },
    { code: "AM", name: "Armenia" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "RU", name: "Russia" },
    { code: "BY", name: "Belarus" },
    { code: "UA", name: "Ukraine" },
    { code: "MD", name: "Moldova" },
    { code: "LT", name: "Lithuania" },
    { code: "LV", name: "Latvia" },
    { code: "EE", name: "Estonia" },
    { code: "EG", name: "Egypt" },
    { code: "LY", name: "Libya" },
    { code: "TN", name: "Tunisia" },
    { code: "DZ", name: "Algeria" },
    { code: "MA", name: "Morocco" },
    { code: "SD", name: "Sudan" },
    { code: "SS", name: "South Sudan" },
    { code: "ET", name: "Ethiopia" },
    { code: "ER", name: "Eritrea" },
    { code: "DJ", name: "Djibouti" },
    { code: "SO", name: "Somalia" },
    { code: "KE", name: "Kenya" },
    { code: "UG", name: "Uganda" },
    { code: "TZ", name: "Tanzania" },
    { code: "RW", name: "Rwanda" },
    { code: "BI", name: "Burundi" },
    { code: "MZ", name: "Mozambique" },
    { code: "MW", name: "Malawi" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" },
    { code: "BW", name: "Botswana" },
    { code: "NA", name: "Namibia" },
    { code: "ZA", name: "South Africa" },
    { code: "LS", name: "Lesotho" },
    { code: "SZ", name: "Eswatini" },
    { code: "MG", name: "Madagascar" },
    { code: "MU", name: "Mauritius" },
    { code: "SC", name: "Seychelles" },
    { code: "KM", name: "Comoros" },
    { code: "AO", name: "Angola" },
    { code: "CD", name: "Democratic Republic of the Congo" },
    { code: "CG", name: "Republic of the Congo" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "CM", name: "Cameroon" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "GA", name: "Gabon" },
    { code: "ST", name: "São Tomé and Príncipe" },
    { code: "GH", name: "Ghana" },
    { code: "TG", name: "Togo" },
    { code: "BJ", name: "Benin" },
    { code: "BF", name: "Burkina Faso" },
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "LR", name: "Liberia" },
    { code: "SL", name: "Sierra Leone" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "SN", name: "Senegal" },
    { code: "GM", name: "Gambia" },
    { code: "ML", name: "Mali" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "MR", name: "Mauritania" },
    { code: "CV", name: "Cape Verde" },
    { code: "MX", name: "Mexico" },
    { code: "GT", name: "Guatemala" },
    { code: "BZ", name: "Belize" },
    { code: "SV", name: "El Salvador" },
    { code: "HN", name: "Honduras" },
    { code: "NI", name: "Nicaragua" },
    { code: "CR", name: "Costa Rica" },
    { code: "PA", name: "Panama" },
    { code: "CU", name: "Cuba" },
    { code: "JM", name: "Jamaica" },
    { code: "HT", name: "Haiti" },
    { code: "DO", name: "Dominican Republic" },
    { code: "PR", name: "Puerto Rico" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "BB", name: "Barbados" },
    { code: "LC", name: "Saint Lucia" },
    { code: "GD", name: "Grenada" },
    { code: "VC", name: "Saint Vincent and the Grenadines" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "KN", name: "Saint Kitts and Nevis" },
    { code: "DM", name: "Dominica" },
    { code: "BS", name: "Bahamas" },
    { code: "CO", name: "Colombia" },
    { code: "VE", name: "Venezuela" },
    { code: "GY", name: "Guyana" },
    { code: "SR", name: "Suriname" },
    { code: "BR", name: "Brazil" },
    { code: "EC", name: "Ecuador" },
    { code: "PE", name: "Peru" },
    { code: "BO", name: "Bolivia" },
    { code: "PY", name: "Paraguay" },
    { code: "UY", name: "Uruguay" },
    { code: "AR", name: "Argentina" },
    { code: "CL", name: "Chile" },
    { code: "FK", name: "Falkland Islands" },
    { code: "NZ", name: "New Zealand" },
    { code: "FJ", name: "Fiji" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "SB", name: "Solomon Islands" },
    { code: "VU", name: "Vanuatu" },
    { code: "NC", name: "New Caledonia" },
    { code: "PF", name: "French Polynesia" },
    { code: "WS", name: "Samoa" },
    { code: "TO", name: "Tonga" },
    { code: "KI", name: "Kiribati" },
    { code: "TV", name: "Tuvalu" },
    { code: "NR", name: "Nauru" },
    { code: "PW", name: "Palau" },
    { code: "FM", name: "Micronesia" },
    { code: "MH", name: "Marshall Islands" }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // US States for when US is selected
  const usStates = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" }
  ];

  // Canadian provinces for when Canada is selected
  const canadianProvinces = [
    { code: "AB", name: "Alberta" },
    { code: "BC", name: "British Columbia" },
    { code: "MB", name: "Manitoba" },
    { code: "NB", name: "New Brunswick" },
    { code: "NL", name: "Newfoundland and Labrador" },
    { code: "NS", name: "Nova Scotia" },
    { code: "ON", name: "Ontario" },
    { code: "PE", name: "Prince Edward Island" },
    { code: "QC", name: "Quebec" },
    { code: "SK", name: "Saskatchewan" },
    { code: "NT", name: "Northwest Territories" },
    { code: "NU", name: "Nunavut" },
    { code: "YT", name: "Yukon" }
  ];

  // Use real cart data instead of mock data
  const subtotal = getTotalPrice();
  const shippingTotal = 150; // Fixed shipping cost
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + shippingTotal + tax;

  const steps = [
    { id: 1, title: "Shipping", icon: Truck },
    { id: 2, title: "Payment", icon: CreditCard },
    { id: 3, title: "Review", icon: Check }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold font-['Orbitron'] text-gradient">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : "border-muted-foreground text-muted-foreground"
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-medium">
                {step.title}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ml-6 transition-all duration-300 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-['Orbitron']">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main Street" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="bg-background border-white/20 hover:border-white/40 z-50">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/20 max-h-60 z-50">
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code} className="hover:bg-white/10">
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="state">
                        {selectedCountry === "US" ? "State" : selectedCountry === "CA" ? "Province" : "State/Province"}
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-background border-white/20 hover:border-white/40 z-40">
                          <SelectValue placeholder={
                            selectedCountry === "US" ? "Select state" : 
                            selectedCountry === "CA" ? "Select province" : 
                            "Select state/province"
                          } />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/20 max-h-60 z-40">
                          {selectedCountry === "US" && usStates.map((state) => (
                            <SelectItem key={state.code} value={state.code} className="hover:bg-white/10">
                              {state.name}
                            </SelectItem>
                          ))}
                          {selectedCountry === "CA" && canadianProvinces.map((province) => (
                            <SelectItem key={province.code} value={province.code} className="hover:bg-white/10">
                              {province.name}
                            </SelectItem>
                          ))}
                          {selectedCountry !== "US" && selectedCountry !== "CA" && (
                            <SelectItem value="other" className="hover:bg-white/10">
                              Other/Not Applicable
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zip">
                      {selectedCountry === "US" ? "ZIP Code" : 
                       selectedCountry === "CA" ? "Postal Code" : 
                       selectedCountry === "GB" ? "Postcode" : 
                       "Postal Code"}
                    </Label>
                    <Input 
                      id="zip" 
                      placeholder={
                        selectedCountry === "US" ? "10001" : 
                        selectedCountry === "CA" ? "K1A 0A6" : 
                        selectedCountry === "GB" ? "SW1A 1AA" : 
                        "Enter postal code"
                      } 
                      className="mt-1" 
                    />
                  </div>

                  {selectedCountry !== "US" && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm text-blue-400 mb-2">
                        <strong>International Shipping Notice:</strong>
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Additional shipping costs and delivery time may apply</li>
                        <li>• Custom duties and taxes are the responsibility of the recipient</li>
                        <li>• Some restrictions may apply to certain countries</li>
                        <li>• Contact us for shipping quotes to your location</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox id="saveAddress" />
                    <Label htmlFor="saveAddress" className="text-sm">
                      Save this address for future orders
                    </Label>
                  </div>

                  <Button 
                    onClick={() => setCurrentStep(2)} 
                    className="w-full" 
                    variant="futuristic"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-['Orbitron']">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "card" ? "border-primary bg-primary/10" : "border-white/20"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit Card</span>
                        </div>
                      </div>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "paypal" ? "border-primary bg-primary/10" : "border-white/20"
                        }`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-600 rounded"></div>
                          <span>PayPal</span>
                        </div>
                      </div>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "crypto" ? "border-primary bg-primary/10" : "border-white/20"
                        }`}
                        onClick={() => setPaymentMethod("crypto")}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-orange-500 rounded"></div>
                          <span>Crypto</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          className="mt-1" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" className="mt-1" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox id="savePayment" />
                    <Label htmlFor="savePayment" className="text-sm">
                      Save payment method for future purchases
                    </Label>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => setCurrentStep(1)} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Back to Shipping
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)} 
                      className="flex-1" 
                      variant="futuristic"
                    >
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review & Payment */}
            {currentStep === 3 && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-['Orbitron']">
                    <Check className="h-5 w-5" />
                    Review & Complete Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="text-sm text-green-400">Shipping: $150</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-green-400">
                      <Shield className="h-5 w-5" />
                      <span className="text-sm">Your order is protected by our guarantee</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Gateway Integration */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Complete Your Payment</h3>
                    <PaymentGateway
                      amount={total}
                      description={`Order for ${cartItems.length} item(s)`}
                      onSuccess={(paymentId) => {
                        toast({
                          title: "Payment Successful!",
                          description: `Your order has been placed. Payment ID: ${paymentId}`,
                        });
                        // Navigate to success page
                        window.location.href = `/payment-success?payment_id=${paymentId}`;
                      }}
                      onError={(error) => {
                        toast({
                          title: "Payment Failed",
                          description: error,
                          variant: "destructive",
                        });
                      }}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => setCurrentStep(2)} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Back to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-white/10 sticky top-8">
              <CardHeader>
                <CardTitle className="font-['Orbitron']">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  * Estimated delivery: 3-7 business days
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};