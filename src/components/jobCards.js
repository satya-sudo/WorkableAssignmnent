import React from 'react';
import { Card, Stack, Button, Typography } from '@mui/material'; 
import LazyImage from './imageHolder'; 
import TruncateText from './textTruncate';

import './jobCards.css';

const JobsCard = ({
  companyName,
  jobRole,
  location,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode,
  text,
  minExp,
  logoUrl,
  jdLink,
}) => {
  
  const salaryRange = minJdSalary ? `${minJdSalary} - ${maxJdSalary} LPA` : `${maxJdSalary} LPA`;

  const getCurrencySymbol = (salaryCurrencyCode) => {
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      AUD: 'A$',
      CAD: 'C$',
      INR: '₹',
    };
    return currencySymbols[salaryCurrencyCode] || '';
  };

  const handleButtonClick = () => {
    window.open(jdLink, '_blank');
  };

  return (
    <Card className='card'>
      <Stack direction="row" margin={2}>
        <LazyImage src={logoUrl} alt="Company Logo" />
        <Stack marginLeft={2}>
          {companyName && <span className='company'>{companyName}</span>}
          {jobRole && <span className="role" >{jobRole}</span>}
          {location && <span className="location">{location}</span>}
        </Stack>
      </Stack>
      <Stack margin={2}>
      <p className='salary'>Estimated Salary: {`${getCurrencySymbol(salaryCurrencyCode)} ${salaryRange}`}</p>
      <Stack>
        <p className='about_header'>About Company:</p>
        <p className='about_header'><strong>About us</strong></p>
        {text && <TruncateText text={text} />}
        {minExp && (
          <div>
            <h3 className='footer_experience'>Minimum Experience</h3>
            <h2 className='footer_experience_value'>{`${minExp} YEARS`}</h2>
          </div>
        )}
      </Stack>
      <Button onClick={handleButtonClick} variant="contained" className='apply_btn'>
        Easy Apply
      </Button >
      </Stack>
    </Card>
  );
};

export default JobsCard;
