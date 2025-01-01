import React from 'react';

export function FooterCopyright() {
  return (
    <div className="mt-8 pt-8 border-t border-gray-800">
      <p className="text-gray-400 text-sm text-center opacity-70">
        © {new Date().getFullYear()} ReviewPro+. All rights reserved.
      </p>
    </div>
  );
}