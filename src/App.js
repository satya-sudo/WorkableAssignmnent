import React, { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import { fetchJobsList } from './helpers/resources';
import FilterDropdownList from './components/filterDropdownList';
import JobsCard from './components/jobCards';
import { EXPERIENCE, NO_OF_EMPOYEES, REMOTE, ROLES, SALARY } from './constants';
import Stack from '@mui/material/Stack';

function AppContainer() {
  const [jobsList, setJobsList] = useState([]);
  const [rolesFilter, setRolesFilter] = useState([]);
  const [noOfEmpFilter, setNoOfEmpFilter] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState([]);
  const [salaryFilter, setSalaryFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const limit = 10; 

  const getJobList = async (page) => {
    try {
      const offset = (page - 1) * limit;
      const res = await fetchJobsList({limit, offset});
      setJobsList((prevJobsList) => [...prevJobsList, ...res?.jdList]);
      setHasMore(res?.jdList.length === limit);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
      !isLoading &&
      hasMore
    ) {
      setIsLoading(true);
      pageRef.current += 1;
      getJobList(pageRef.current);
    }
  };

  useEffect(() => {
    getJobList(pageRef.current);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Fetch initial data and add scroll event listener

  const renderJobs = () => {
    return jobsList.map((ele) => (
      <JobsCard
        key={ele.jdUid}
        logoUrl={ele.logoUrl}
        companyName={ele.companyName}
        location={ele.location}
        jobRole={ele.jobRole}
        maxJdSalary={ele.maxJdSalary}
        salaryCurrencyCode={ele.salaryCurrencyCode}
        text={ele.jobDetailsFromCompany}
        minExp={ele.minExp}
        jdLink={ele.jdLink}
      />
    ));
  };

  return (
    <Container>
      <Stack direction="row" flexWrap="wrap" alignItems="center">
        <FilterDropdownList label={'Roles'} options={ROLES} value={rolesFilter} setValue={setRolesFilter} multiple={true} />
        <FilterDropdownList label={'No of Employees'} options={NO_OF_EMPOYEES} value={noOfEmpFilter} setValue={setNoOfEmpFilter} multiple={true} />
        <FilterDropdownList label={'Experience'} options={EXPERIENCE} value={experienceFilter} setValue={setExperienceFilter} />
        <FilterDropdownList label={'Remote'} options={REMOTE} value={remoteFilter} setValue={setRemoteFilter} multiple={true} />
        <FilterDropdownList label={'Min Base Pay'} options={SALARY} value={salaryFilter} setValue={setSalaryFilter} />
      </Stack>
      <Stack direction="row" flexWrap="wrap" alignItems="center">
        {renderJobs()}
        {isLoading && <p>Loading...</p>}
      </Stack>
    </Container>
  );
}

export default AppContainer;
