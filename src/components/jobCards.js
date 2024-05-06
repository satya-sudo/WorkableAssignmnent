import React from 'react';
import { Card, Stack, Button } from '@mui/material'; 
import LazyImage from './imageHolder'; 
import TruncateText from './textTruncate';

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
    <Card>
      <Stack direction="row" margin={2}>
        <LazyImage src={logoUrl} alt="Company Logo" />
        <Stack marginLeft={2}>
          {companyName && <span>{companyName}</span>}
          {jobRole && <span>{jobRole}</span>}
          {location && <span>{location}</span>}
        </Stack>
      </Stack>
      <div>Estimated Salary: {`${getCurrencySymbol(salaryCurrencyCode)} ${salaryRange}`}</div>
      <Stack>
        <div>About Company:</div>
        <div>About us</div>
        {text && <TruncateText text={text} />}
        {minExp && (
          <div>
            <div>Minimum Experience</div>
            <div>{`${minExp} YEARS`}</div>
          </div>
        )}
      </Stack>
      <Button onClick={handleButtonClick} variant="contained" color="primary">
        Easy Apply
      </Button>
    </Card>
  );
};

export default JobsCard;
