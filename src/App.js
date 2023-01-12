import React, { useState, useEffect } from 'react';
import data from './assets/data.json'
import JobBoardComponent from './components/JobBoardComponent';

function App() {
  const [jobs, setJobs] = useState([]); 


  //updates the array
  useEffect(() => setJobs(data), []);


  return (
    <div className="App">
      <header>
        <img src='/images/bg-header-desktop.svg' alt='bg-image' />
      </header>
          {/* <h1 className="text-4xl text-center my-6 font-bold">Job Listings</h1> */}
      {jobs.length === 0 ? (
          <p>Jobs are fetching...</p>
        ) : (
          jobs.map((job) => <JobBoardComponent job={job} key={job.id} />)
          )}
    </div>
  );
}

export default App;
