import React, { useEffect, useState, useRef } from 'react';
import { debounce } from 'lodash';

import { fetchJobsList } from './helpers/resources';

import FilterDropdownList from './components/filterDropdownList';
import JobsCard from './components/jobCards';
import GoToTopButton from './components/GotoTopBtn';
import { EXPERIENCE, NO_OF_EMPOYEES, REMOTE, ROLES, SALARY } from './constants';

import { Grid, TextField, Typography,Stack, Container } from '@mui/material';


function AppContainer() {
  const [jobsList, setJobsList] = useState([]);

  // filter states
  const [rolesFilter, setRolesFilter] = useState([]);
  const [noOfEmpFilter, setNoOfEmpFilter] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState([]);
  const [salaryFilter, setSalaryFilter] = useState([]);
  const [searchFilter, setSearchFilter] =  useState('')

  // api status states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterJobList, setFilterJobList] = useState([]);
  const pageRef = useRef(1);
  const limit = 30; 

  const getJobList = async (page) => {
    try {
      const offset = (page - 1) * limit;
      const res = await fetchJobsList({ limit, offset });
      // add to existing list
      setJobsList((prevJobsList) => [...prevJobsList, ...res?.jdList]);
      setHasMore(offset + limit < res.totalCount);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      // window height + scroll value is greater than elementheight - 100px and no further api calls in fetch mode 
      // call api to get next set of jobs
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100 &&
      !isLoading &&
      hasMore
    ) {
      setIsLoading(true);
      pageRef.current += 1;
      getJobList(pageRef.current);
    }
  };
  const debouncedHandleScroll = debounce(handleScroll, 300);

  useEffect(() => {
    getJobList(pageRef.current);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  useEffect(() => {
    let filterJobLists = jobsList

    if (experienceFilter?.length) {
      filterJobLists =  jobsList.filter(ele => ele.minExp <= parseInt(experienceFilter))
    }
    // no data in the api response for no of employee
    if (remoteFilter?.length) {
      filterJobLists =  filterJobLists.filter(ele => 
        (ele.location === "remote" && remoteFilter.includes("Remote"))
        || (ele.location === "hybrid" && remoteFilter.includes("Hybrid")) 
        || ( ele.location !== "remote" && ele.location !== "hybrid"  && remoteFilter.includes("In-office"))
      );
    }
    if (salaryFilter?.length) {
      filterJobLists =  filterJobLists.filter(ele => ele.minJdSalary >= parseInt(salaryFilter.replace("L", "")))
    }

    if (rolesFilter.length) {
      filterJobLists =  filterJobLists.filter(ele =>  rolesFilter.includes(ele.jobRole))
    }
    if (searchFilter && searchFilter?.length) {
      filterJobLists =  filterJobLists.filter(ele =>  {
        const searchFilterCompare =  searchFilter?.toLocaleLowerCase();
        const companyName = ele.companyName?.toLocaleLowerCase() || "";
        return companyName.includes(searchFilterCompare)  
      })
    }
    setFilterJobList(filterJobLists);
    
  }, [rolesFilter,noOfEmpFilter,experienceFilter, remoteFilter, salaryFilter, jobsList, searchFilter]);

  const renderJobs = () => {
    return filterJobList.map((ele) => (
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={ele.jdUid}>
        <JobsCard
          logoUrl={ele.logoUrl}
          companyName={ele.companyName}
          location={ele.location}
          jobRole={ele.jobRole}
          minJdSalary={ele.minJdSalary}
          maxJdSalary={ele.maxJdSalary}
          salaryCurrencyCode={ele.salaryCurrencyCode}
          text={ele.jobDetailsFromCompany}
          minExp={ele.minExp}
          jdLink={ele.jdLink}
        />
      </Grid>
    ));
  };

  return (
    <Container>
      <Stack direction="row" flexWrap="wrap" alignItems="center" marginBottom={2}>
        <FilterDropdownList label={'Roles'} options={ROLES} value={rolesFilter} setValue={setRolesFilter} multiple={true} />
        <FilterDropdownList label={'No of Employees'} options={NO_OF_EMPOYEES} value={noOfEmpFilter} setValue={setNoOfEmpFilter} multiple={true} />
        <FilterDropdownList label={'Experience'} options={EXPERIENCE} value={experienceFilter} setValue={setExperienceFilter} />
        <FilterDropdownList label={'Remote'} options={REMOTE} value={remoteFilter} setValue={setRemoteFilter} multiple={true} />
        <FilterDropdownList label={'Min Base Pay'} options={SALARY} value={salaryFilter} setValue={setSalaryFilter} />
        <TextField id="outlined-basic"  variant="outlined"  size='small' placeholder='Search for company'  value={searchFilter} onChange={e=>setSearchFilter(e.target.value)}  sx={{ minWidth: 200, margin: '0px 5px 10px 0px' }}/>
      </Stack>
      {!filterJobList.length && !isLoading ? <Typography variant='h6' textAlign="center">Sorry no such job posting found!</Typography> : null}
      <Grid container spacing={3}>
        {renderJobs()}
      </Grid>
      {isLoading && <p>Loading...</p>}
      <GoToTopButton />
    </Container>
  );
}

export default AppContainer;
