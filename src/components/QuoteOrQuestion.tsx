'use client';

import { useState, useEffect } from 'react';

export default function QuoteOrQuestion() {
  const [content, setContent] = useState({ text: '', type: '' });

  useEffect(() => {
    fetch('/api/get-content')
      .then(response => response.json())
      .then(data => setContent({ text: data.content, type: data.type }))
      .catch(error => {
        console.error('Error fetching content:', error);
        setContent({ 
          text: "What's one small step you can take today towards your biggest goal?",
          type: 'question'
        });
      });
  }, []);

  return (
    <p className="text-2xl font-libre-baskerville text-gray-500 text-center max-w-2xl mx-auto ">
      {content.type === 'quote' ? '"' : ''}{content.text}{content.type === 'quote' ? '"' : ''}
    </p>
  );
}