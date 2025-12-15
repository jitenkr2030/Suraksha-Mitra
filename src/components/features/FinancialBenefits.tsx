"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  Smartphone, 
  ShoppingCart, 
  Bus,
  Lightbulb,
  CreditCard,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Percent
} from "lucide-react";

interface WalletBalance {
  total: number;
  savings: number;
  available: number;
}

interface LoanOption {
  id: string;
  name: string;
  amount: string;
  interestRate: string;
  tenure: string;
  processingFee: string;
}

interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  discount: string;
  description: string;
  icon: any;
}

export function FinancialBenefits() {
  const [activeTab, setActiveTab] = useState("wallet");
  const [loanAmount, setLoanAmount] = useState("");
  const [savingsAmount, setSavingsAmount] = useState("");

  const walletBalance: WalletBalance = {
    total: 15420,
    savings: 10000,
    available: 5420,
  };

  const loanOptions: LoanOption[] = [
    {
      id: "1",
      name: "Emergency Loan",
      amount: "₹2,000 - ₹10,000",
      interestRate: "12% p.a.",
      tenure: "1-6 months",
      processingFee: "2%",
    },
    {
      id: "2",
      name: "Medical Loan",
      amount: "₹5,000 - ₹25,000",
      interestRate: "10% p.a.",
      tenure: "3-12 months",
      processingFee: "1%",
    },
    {
      id: "3",
      name: "Education Loan",
      amount: "₹10,000 - ₹50,000",
      interestRate: "8% p.a.",
      tenure: "6-24 months",
      processingFee: "1%",
    },
  ];

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "1",
      name: "Mobile Recharge",
      category: "Recharge",
      discount: "5% cashback",
      description: "On all mobile recharges",
      icon: Smartphone,
    },
    {
      id: "2",
      name: "Grocery Shopping",
      category: "Shopping",
      discount: "10% off",
      description: "At partner stores",
      icon: ShoppingCart,
    },
    {
      id: "3",
      name: "Bus Pass",
      category: "Travel",
      discount: "15% discount",
      description: "Monthly bus passes",
      icon: Bus,
    },
    {
      id: "4",
      name: "Electricity Bill",
      category: "Utilities",
      discount: "3% cashback",
      description: "On bill payments",
      icon: Lightbulb,
    },
  ];

  const recentTransactions = [
    { id: "1", type: "credit", amount: 1200, description: "Salary credited", date: "Today" },
    { id: "2", type: "debit", amount: 500, description: "Mobile recharge", date: "Yesterday" },
    { id: "3", type: "credit", amount: 100, description: "Cashback received", date: "2 days ago" },
    { id: "4", type: "debit", amount: 200, description: "Grocery shopping", date: "3 days ago" },
  ];

  const handleApplyLoan = (loanOption: LoanOption) => {
    alert(`Loan application for "${loanOption.name}" submitted. Our team will contact you soon.`);
  };

  const handleAddSavings = () => {
    if (savingsAmount) {
      alert(`₹${savingsAmount} added to your savings wallet successfully!`);
      setSavingsAmount("");
    }
  };

  const tabs = [
    { id: "wallet", label: "My Wallet", icon: Wallet },
    { id: "loans", label: "Loans", icon: CreditCard },
    { id: "savings", label: "Savings", icon: PiggyBank },
    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Financial Benefits</h1>
        <p className="text-gray-600">Manage your finances and grow your savings</p>
      </div>

      {/* Wallet Summary Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <p className="text-3xl font-bold">₹{walletBalance.total.toLocaleString()}</p>
            </div>
            <Wallet className="h-12 w-12 text-blue-200" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-100 text-xs">Savings</p>
              <p className="text-lg font-semibold">₹{walletBalance.savings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Available</p>
              <p className="text-lg font-semibold">₹{walletBalance.available.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "wallet" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {transaction.type === "credit" ? (
                          <ArrowDownRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Add Money
              </Button>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Statement
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "loans" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Loans</h3>
          <div className="space-y-3">
            {loanOptions.map((loan) => (
              <Card key={loan.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{loan.name}</h4>
                      <p className="text-sm text-gray-600">{loan.amount}</p>
                    </div>
                    <Badge variant="outline">{loan.interestRate}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <p className="font-medium">Tenure</p>
                      <p>{loan.tenure}</p>
                    </div>
                    <div>
                      <p className="font-medium">Processing Fee</p>
                      <p>{loan.processingFee}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleApplyLoan(loan)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">Loan Information</p>
                  <p className="text-sm text-orange-700">
                    Loans are subject to verification. Minimum salary requirement: ₹15,000/month.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "savings" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Micro-Savings Wallet</h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="savings">Add to Savings</Label>
                  <Input
                    id="savings"
                    type="number"
                    placeholder="Enter amount"
                    value={savingsAmount}
                    onChange={(e) => setSavingsAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleAddSavings}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!savingsAmount}
                >
                  Add to Savings
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <PiggyBank className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">Goal Based Savings</h4>
                <p className="text-xs text-gray-600">Set savings goals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">Fixed Deposits</h4>
                <p className="text-xs text-gray-600">Earn 7% interest</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Savings Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Save 20% of your income</p>
                  <p className="text-xs text-gray-600">Build a secure financial future</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Emergency fund</p>
                  <p className="text-xs text-gray-600">Keep 3 months expenses saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "marketplace" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Discount Marketplace</h3>
          <div className="grid grid-cols-2 gap-3">
            {marketplaceItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <item.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <Badge className="mt-1 bg-green-100 text-green-800">
                    <Percent className="h-3 w-3 mr-1" />
                    {item.discount}
                  </Badge>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Bill Payment Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex flex-col">
                  <Smartphone className="h-6 w-6 mb-1" />
                  <span className="text-xs">Mobile</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <Lightbulb className="h-6 w-6 mb-1" />
                  <span className="text-xs">Electricity</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <ShoppingCart className="h-6 w-6 mb-1" />
                  <span className="text-xs">DTH</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <Bus className="h-6 w-6 mb-1" />
                  <span className="text-xs">Travel</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}