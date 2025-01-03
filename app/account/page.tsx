"use client"
import { useEffect, useState } from 'react';
import { Settings, Key, Bell, Shield, Users, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { TeamSection } from '@/components/account/TeamSection';
import { BillingSection } from '@/components/account/BillingSection';
// @ts-ignore
import Profile from '@/pages/AccountPage/Profile';
// @ts-ignore
import UpdatePasswordForm from '@/pages/AccountPage/UpdatePassword';

// Firebase, get user info depending on their 'uid' value
// @ts-ignore
import { useAuth } from '@/contexts/AuthContext';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// @ts-ignore
import DeleteButton from '@/pages/AccountPage/DeleteButton';
import { redirect } from 'next/navigation';

const emptyUser = {
  email: "",
  password: "",
  businessName: "",
  businessType: "",
  fullName: "",
  listingCount: 0,
  plan: "",
  subscriptionDate: "",
  paymentDate: "",
  status: "",
  provider: {
    name: "",
    key: "",
    account: ""
  }
}


export default function AccountPage() {

//////////////////////////////////////////////////////////////////
  // Firestore fetch
  const { user } = useAuth() || {}; // Assume your context provides the authenticated user
  const [userData, setUserData] = useState(emptyUser);

  console.log(user);

  if (!user) {
    redirect("/login");
  }
  // console.log(user.providerData[0].providerId);
  const providerType = user.providerData[0].providerId;
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const db = getFirestore();

  const userRef = doc(db, "registeredUsers", user.uid);

  function updateUser (newUser:any) {
    setUserData(newUser)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        // setLoading(false);
        return;
      }

      // const db = getFirestore();
      // const userRef = doc(db, "registeredUsers", user.uid); // Assuming the user's Firestore document is stored in "users/{uid}"

      try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // @ts-ignore
          setUserData(userDoc.data());
        } else {
          console.log("No user document found in Firestore.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);


  const [activeTab, setActiveTab] = useState('profile');
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newReviews: true,
      reviewAlerts: true,
      weeklyDigest: true,
      monthlyReport: true
    },
    push: {
      newReviews: true,
      reviewAlerts: true,
      weeklyDigest: false,
      monthlyReport: false
    }
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareAnalytics: true,
    allowAiAnalysis: true,
    publicProfile: false,
    dataRetention: '12months'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        {/* Tabs */}
        {/* not display the security tab/change password if is a google account */}
        <div className="flex space-x-1 bg-white/5 p-1 rounded-lg mb-8">
          {tabs.map((tab) => {
            if (tab.id === "security" && providerType === "google.com") {
              return
            } else {
              return (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "text-sm font-medium",
                  "transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-primary text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
              )
            }
          }

          )}
        </div>

        {/* Content */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          {activeTab === 'profile' && (

            //////////////////////////////////////////////////////
            // profile tab
            <Profile emptyUser={emptyUser} user={user} db={db} userRef={userRef}
            userData={userData} updateUser={updateUser}/>

          )}

          {activeTab === 'security' &&  (
            <UpdatePasswordForm/>
          )}

          {activeTab === 'team' && 
            <TeamSection />
          
          }

          {activeTab === 'billing' && 
          
            <BillingSection emptyUser={emptyUser} user={user} db={db} userRef={userRef}
            userData={userData} updateUser={updateUser}/>
          
          }

          {activeTab === 'notifications' && (
            <div className="space-y-8">
              {/* Email Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings.email).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300">{key}</span>
                      <button
                        onClick={() => setNotificationSettings(prev => ({
                          ...prev,
                          email: { ...prev.email, [key]: !value }
                        }))}
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors duration-200",
                          value ? "bg-primary" : "bg-gray-600"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute w-4 h-4 bg-white rounded-full top-1",
                            "transition-transform duration-200",
                            value ? "translate-x-7" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Push Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings.push).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300">{key}</span>
                      <button
                        onClick={() => setNotificationSettings(prev => ({
                          ...prev,
                          push: { ...prev.push, [key]: !value }
                        }))}
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors duration-200",
                          value ? "bg-primary" : "bg-gray-600"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute w-4 h-4 bg-white rounded-full top-1",
                            "transition-transform duration-200",
                            value ? "translate-x-7" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Share Analytics Data</h4>
                    <p className="text-sm text-gray-400">Help improve our services with anonymous usage data</p>
                  </div>
                  <button
                    onClick={() => setPrivacySettings(prev => ({
                      ...prev,
                      shareAnalytics: !prev.shareAnalytics
                    }))}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors duration-200",
                      privacySettings.shareAnalytics ? "bg-primary" : "bg-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute w-4 h-4 bg-white rounded-full top-1",
                        "transition-transform duration-200",
                        privacySettings.shareAnalytics ? "translate-x-7" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">AI Analysis</h4>
                    <p className="text-sm text-gray-400">Allow AI to analyze your reviews for better insights</p>
                  </div>
                  <button
                    onClick={() => setPrivacySettings(prev => ({
                      ...prev,
                      allowAiAnalysis: !prev.allowAiAnalysis
                    }))}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors duration-200",
                      privacySettings.allowAiAnalysis ? "bg-primary" : "bg-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute w-4 h-4 bg-white rounded-full top-1",
                        "transition-transform duration-200",
                        privacySettings.allowAiAnalysis ? "translate-x-7" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                {/* <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Public Profile</h4>
                    <p className="text-sm text-gray-400">Make your profile visible to other users</p>
                  </div>
                  <button
                    onClick={() => setPrivacySettings(prev => ({
                      ...prev,
                      publicProfile: !prev.publicProfile
                    }))}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors duration-200",
                      privacySettings.publicProfile ? "bg-primary" : "bg-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute w-4 h-4 bg-white rounded-full top-1",
                        "transition-transform duration-200",
                        privacySettings.publicProfile ? "translate-x-7" : "translate-x-1"
                      )}
                    />
                  </button>
                </div> */}

                {/* <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Data Retention Period
                  </label>
                  <select
                    value={privacySettings.dataRetention}
                    onChange={(e) => setPrivacySettings(prev => ({
                      ...prev,
                      dataRetention: e.target.value
                    }))}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                  >
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="12months">12 Months</option>
                    <option value="forever">Forever</option>
                  </select>
                </div> */}
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button>Save Privacy Settings</Button>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-4">Data Export & Deletion</h4>
                <div className="space-y-4">
                  {/* <Button variant="secondary" fullWidth>
                    Export My Data
                  </Button> */}
                    <DeleteButton emptyUser={emptyUser} user={user} db={db} userRef={userRef}
                    userData={userData} updateUser={updateUser}/>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}