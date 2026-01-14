// Add this to your layout.js or _app.js
'use client';

import { useEffect } from 'react';

export function ReadMoreScript() {
  useEffect(() => {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    const handleReadMoreClick = (btn) => {
      const description = btn.previousElementSibling;
      const isExpanded = btn.getAttribute('data-expanded') === 'true';
      
      if (isExpanded) {
        description.classList.remove('expanded');
        btn.textContent = 'Read More';
        btn.setAttribute('data-expanded', 'false');
      } else {
        description.classList.add('expanded');
        btn.textContent = 'Read Less';
        btn.setAttribute('data-expanded', 'true');
      }
    };
    
    readMoreBtns.forEach(btn => {
      btn.addEventListener('click', () => handleReadMoreClick(btn));
    });
    
    return () => {
      readMoreBtns.forEach(btn => {
        btn.removeEventListener('click', () => handleReadMoreClick(btn));
      });
    };
  }, []);

  return null;
}