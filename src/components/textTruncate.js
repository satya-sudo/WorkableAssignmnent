import { Stack } from '@mui/material';
import React, { useState } from 'react';

const TruncateText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = isExpanded ? text : `${text.slice(0, 150)}...`;

  return (
    <Stack>
      <p className='job_details'>{truncatedText}</p>
      {!isExpanded && (
        <button onClick={toggleExpansion}  className='show-more-btn'>
          Show More
        </button>
      )}
    </Stack>
  );
};

export default TruncateText;
