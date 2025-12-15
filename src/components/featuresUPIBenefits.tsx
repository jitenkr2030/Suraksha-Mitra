export function UPIBenefits() {
  const benefits = [
    {
      title: "Zero Transaction Fees",
      description: "No charges for any UPI payments - keep 100% of revenue",
      icon: "💰"
    },
    {
      title: "Instant Payments",
      description: "Money transfers immediately to your bank account",
      icon: "⚡"
    },
    {
      title: "Bank-Level Security",
      description: "Protected by NPCI and RBI regulations",
      icon: "🔒"
    },
    {
      title: "Universal Acceptance",
      description: "Works with all UPI apps and all Indian banks",
      icon: "📱"
    },
    {
      title: "24/7 Availability",
      description: "Pay anytime, anywhere - no holidays or downtime",
      icon: "🕐"
    },
    {
      title: "Direct Bank Transfer",
      description: "No middlemen - direct transfer to your account",
      icon: "🏦"
    },
    {
      title: "Easy Integration",
      description: "Simple QR code and UPI ID - no complex setup",
      icon: "🔧"
    },
    {
      title: "Mass Adoption",
      description: "300+ million UPI users across India",
      icon: "👥"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {benefits.map((benefit, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="text-3xl mb-3">{benefit.icon}</div>
            <h3 className="font-semibold text-sm mb-2 text-gray-900">{benefit.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}