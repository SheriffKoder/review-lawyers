import React, { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { TeamMembersList } from './TeamMembersList';
import { InviteMemberForm } from './InviteMemberForm';

export function TeamSection() {
  const [showInviteForm, setShowInviteForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Team Members</h3>
          <p className="text-sm text-gray-400">Manage your team and their access levels</p>
        </div>
        <Button 
          onClick={() => setShowInviteForm(true)}
          className="flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>

      <TeamMembersList />

      {showInviteForm && (
        <InviteMemberForm onClose={() => setShowInviteForm(false)} />
      )}
    </div>
  );
}