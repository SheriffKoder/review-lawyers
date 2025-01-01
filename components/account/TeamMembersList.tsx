import React from 'react';
import { User, Shield, Trash2, Crown } from 'lucide-react';
import { Button } from '../ui/Button';

const MOCK_MEMBERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'member' }
];

export function TeamMembersList() {
  return (
    <div className="space-y-4">
      {MOCK_MEMBERS.map((member) => (
        <div 
          key={member.id}
          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-white font-medium flex items-center gap-2">
                {member.name}
                {member.role === 'owner' && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </h4>
              <p className="text-sm text-gray-400">{member.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              defaultValue={member.role}
              disabled={member.role === 'owner'}
              className="bg-black/50 border border-white/10 rounded-lg px-3 py-1 text-sm text-white"
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>

            {member.role !== 'owner' && (
              <Button 
                variant="secondary"
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}