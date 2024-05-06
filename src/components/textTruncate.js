import React, { useState } from 'react';

const TruncateText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = isExpanded ? text : `${text.slice(0, 150)}...`;

  return (
    <div>
      <p>{truncatedText}</p>
      {!isExpanded && (
        <button onClick={toggleExpansion} style={{ opacity: 0.5 }}>
          Show More
        </button>
      )}
    </div>
  );
};

export default TruncateText;
