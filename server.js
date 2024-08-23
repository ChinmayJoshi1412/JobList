import http from 'http'
import { readFileSync } from 'fs';
import process from 'process';
let data;
data = JSON.parse(readFileSync('./src/jobs.json','utf-8'))

const port = process.env.PORT;

const getAllJobsHandler=(req,res)=>{
    res.write(JSON.stringify(data));
    res.end();
}

const getHomePageJobsHandler=(req,res)=>{
    const limiteditems = data.slice(0,3);
     res.write(JSON.stringify(limiteditems));
     res.end();
}

const getJobByIdHandler=(req,res)=>{
    const id = req.url.split('/')[2];
        const job = data.find((job)=>job.id==parseInt(id));
        if(job)
        {
            res.write(JSON.stringify(job));
            res.end();   
        }
        else{     
            res.statusCode = 404
            res.write(JSON.stringify({message:'Job not found'}));
            res.end();
        }
}

const createNewJobHandler = (req,res)=>{
    let body = '';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        })
        req.on('end',()=>{
            const newJob = JSON.parse(body);
            const company = newJob["company"]
            const newData = {
                "id":data.length+1,
                "title": newJob["title"],
                "type": newJob["type"],
                "description": newJob["description"],
                "location": newJob["location"],
                "salary": newJob["salary"],
                "company": {
                    "name": company["name"],
                    "description": company["description"],
                    "contactEmail": company["contactEmail"],
                    "contactPhone": company["contactPhone"]
                }
                }
        data.push(newData);
        res.statusCode=201;
        res.write(JSON.stringify(newData));
        res.end();
        });
}

const deleteJobHandler=(req,res)=>{
    const id = req.url.split('/')[2];
        const jobIndex = data.findIndex((job) => job.id == parseInt(id));

            if (jobIndex !== -1) {
                data.splice(jobIndex,1);
                res.statusCode=201,
                res.write(JSON.stringify({ message: 'Job removed successfully' }));
                res.end();
            } else {
                res.statusCode = 404;
                res.write(JSON.stringify({ message: 'Job not found' }));
                res.end();
            }
}

const EditJobHandler=(req,res)=>{
    const id = req.url.split('/')[2];
        const jobIndex = data.findIndex((job) => job.id == parseInt(id));
        let body = '';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        })
        req.on('end',()=>{
            const newJob = JSON.parse(body);    
            data[jobIndex] = newJob
            res.statusCode=201;
            res.write(JSON.stringify(newJob));
            res.end();
        });
}

const notFoundHander=(req,res)=>{
    res.statusCode = 404
    res.write(JSON.stringify({message:'Route not found'}));
    res.end();
}

const server = http.createServer((req,res)=>{
    if(req.url=='/jobs?_limit=3' && req.method=='GET'){
        getHomePageJobsHandler(req,res)
    }
    else if(req.url=='/jobs' && req.method=='GET'){
        getAllJobsHandler(req,res);
    }
    else if(req.url.match(/\/jobs\/([0-9]+)/) && req.method=='GET'){
        getJobByIdHandler(req,res)
    }
    else if(req.url=='/jobs' && req.method=='POST'){
        createNewJobHandler(req,res);
    }
    else if(req.url.match(/\/jobs\/([0-9]+)/) && req.method=='DELETE'){
        deleteJobHandler(req,res);
    }
    else if(req.url.match(/\/jobs\/([0-9]+)/)&& req.method=='PUT'){
        EditJobHandler(req,res);
    }
    else {
        notFoundHander(req,res);
    }
 })

 server.listen(port,()=>{
     console.log(`Server running on port:${port}`)
 })