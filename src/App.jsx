import {Route,createBrowserRouter,createRoutesFromElements, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, {jobLoader} from "./pages/JobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";

const App = () => {
  const addJob = async(newJob) => {
      const res = await fetch('/api/jobs',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      });
      console.log(res);
      return 
  };

  const deleteJob = async(id)=>{
    const res = await fetch(`/api/jobs/${id}`,{
      method: 'DELETE'
    });
    console.log(res);
    return
  }

  const updateJob = async(job) => {
    const res = await fetch(`/api/jobs/${job.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });
    console.log(res);
    return; 
};
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path ='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path='/jobs' element={<JobsPage/>}/>
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader}/>
        <Route path='/add-jobs' element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>  
        <Route path='*' element={<NotFoundPage/>}/>
      </Route>
  )
  );
  
  return <RouterProvider router={router}/>;
};

export default App