import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

// Stripe Payment Link
const PAYMENT_LINK = 'https://buy.stripe.com/8wM2a13VmeBy3v2288';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        console.warn("No user available for subscription fetch");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id) // fallback if UUID match works
          .maybeSingle();

        if (!data) {
          // Try alternative match by email if needed
          const { data: altData, error: altError } = await supabase
            .from('users')
            .select('id')
            .eq('token_identifier', user.email)
            .maybeSingle();

          if (altData) {
            const { data: subData } = await supabase
              .from('subscriptions')
              .select('*')
              .eq('user_id', altData.id)
              .maybeSingle();
            setSubscription(subData);
          } else {
            console.warn("No user ID found for this email");
            setSubscription(null);
          }
        } else {
          setSubscription(data);
        }

        if (error) {
          console.error("Error fetching subscription:", error);
        }
      } catch (err) {
        console.error("Error in fetchSubscription:", err);
        toast({
          title: "Error loading dashboard",
          description: "Something went wrong fetching your subscription.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user, toast]);

  const isSubscriptionActive = subscription?.status === 'active';

  const handleSubscribe = () => {
    window.open(PAYMENT_LINK, '_blank');
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold mb-3">
                  {isSubscriptionActive ? "Welcome to Premium" : "Upgrade to Premium"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {isSubscriptionActive
                    ? "You have full access to FPL Elite Insights"
                    : "Get exclusive access to premium FPL insights and analysis"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isSubscriptionActive && (
                  <>
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          £4.99<span className="text-lg text-gray-600">/month</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Cancel anytime</p>
                      </div>
                      <div className="space-y-3">
                        {[
                          "Access to Top 50 FPL Manager Insights",
                          "Weekly Premium Analysis",
                          "Transfer Market Predictions",
                          "Captain Pick Analysis",
                          "Price Change Alerts",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <Button
                  className="w-full bg-[#01FF87] hover:bg-[#00E578] text-[#37003C] h-12 text-lg"
                  onClick={isSubscriptionActive ? () => navigate('/premium') : handleSubscribe}
                >
                  {isSubscriptionActive
                    ? "Access FPL Elite Insights"
                    : "Subscribe to FPL Elite Insights Now"}
                </Button>
                {isSubscriptionActive && (
                  <p className="text-center text-sm text-gray-600">
                    Your subscription is active and will renew automatically
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
