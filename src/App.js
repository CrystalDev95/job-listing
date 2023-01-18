import React, { useState, useEffect } from 'react';
import data from './assets/data.json'
import JobBoardComponent from './components/JobBoardComponent';

function App() {
  const [jobs, setJobs] = useState([]); 
  const [filters, setFilters] = useState([]);

  //updates the array
  useEffect(() => setJobs(data), []);
  
    const filterFunc = ({role, level, tools, languages}
      ) => {
        if(filters.length === 0) {
          return true;
        }

      const tags = [role, level];

      if(tools) {
        tags.push(...tools);
    }

    if(languages) {
        tags.push(...languages);
    }
    
    return tags.some((tag) => filters.includes(tag));
    }


const handleTagClick = (tag) => {
  if(filters.includes(tag)) return;
  setFilters([...filters, tag]);
}

const handleFilterClick = (passedFilter) => {
  setFilters(filters.filter(f => f !== passedFilter))
}


  const filteredJobs = jobs.filter(filterFunc);

  const clearFilters = () => {
    setFilters([]);
  }


  return (
    <div className="App">
      <header>
        <img src='/images/bg-header-desktop.svg' alt='bg-image' />
      </header>

      <div className='flex bg-white shadow-md my-16 mx-10 p-6 rounded'>
        {
          filters.length > 0 && filters.map(
            (filter) => <span
            className='text-teal-500 bg-teal-100 font-bold mr-4 mb-4 p-2 rounded sm:mb-0'
            >{filter}
            <span 
            onClick={() =>
            handleFilterClick(filter)}
            className='cursor-pointer bg-teal-500 text-teal-100 px-2 py-1 ml-3'>X</span>
            </span>
          )}
          <button
          onClick={clearFilters}
          className='font-bold text-gray-700 ml-auto'
          >Clear</button>
      </div>

      {jobs.length === 0 ? (
          <p>Jobs are fetching...</p>
        ) : (
          filteredJobs.map((job) => (
          <JobBoardComponent 
          job={job} 
          key={job.id} 
          handleTagClick={handleTagClick}
          />
          ))
        )}
    </div>
  );
}

export default App;
