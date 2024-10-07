class Job {
    state;
    type;
    file;
    format;
    constructor(type, state, file, format) {
        this.type = type;
        if (state !== undefined && state !== null) {
            this.state = state;
        }
        else {
            this.state = "";
        }
        if (file !== undefined && file !== null) {
            this.file = file;
        }
        else {
            this.file = "";
        }
        if (format !== undefined && format !== null) {
            this.format = format;
        }
        else {
            this.format = "";
        }
    }
    setStateToQueue() {
        this.state = "queued";
    }
    setStateToRunning() {
        this.state = "running";
    }
    setStateToCompleted() {
        this.state = "completed";
    }
}
class JobWorker {
    currentJob;
    constructor() {
    }
    completeCurrentJob() {
        if (this.currentJob !== undefined) {
            this.currentJob.setStateToCompleted();
        }
    }
}
class JobScheduler {
    listOfJobs;
    listOfWorkers;
    constructor() {
        this.listOfJobs = [];
        this.listOfWorkers = [];
    }
    addJob(job) {
        this.listOfJobs.push(job);
    }
    addWorker(worker) {
        this.listOfWorkers.push(worker);
    }
    assignJobs() {
        if (this.listOfJobs.length !== 0 && this.listOfWorkers.length !== 0) {
            let workerIndex = 0;
            for (let j of this.listOfJobs) {
                if (j.state === "queued") {
                    j.setStateToRunning();
                    while (this.listOfWorkers[workerIndex].currentJob !== undefined &&
                        this.listOfWorkers[workerIndex].currentJob.state !== undefined &&
                        this.listOfWorkers[workerIndex].currentJob.state !== "completed") {
                        if (workerIndex === this.listOfWorkers.length) {
                            return;
                        }
                        workerIndex++;
                    }
                    this.listOfWorkers[workerIndex].currentJob = j;
                    workerIndex++;
                    if (workerIndex === this.listOfWorkers.length) {
                        break;
                    }
                }
            }
        }
    }
    getQueuedJobs() {
        let output = [];
        for (let j of this.listOfJobs) {
            if (j.state === "queued") {
                output.push(j);
            }
        }
        return output;
    }
    getRunningJobs() {
        let output = [];
        for (let j of this.listOfJobs) {
            if (j.state === "running") {
                output.push(j);
            }
        }
        return output;
    }
    getCompletedJobs() {
        let output = [];
        for (let j of this.listOfJobs) {
            if (j.state === "completed") {
                output.push(j);
            }
        }
        return output;
    }
}
function testJobScheduling() {
    const job1 = new Job("data_processing", null, "data.txt");
    const job2 = new Job("report_generation", null, null, "pdf");
    const worker1 = new JobWorker();
    const worker2 = new JobWorker();
    const jobScheduler = new JobScheduler();
    job1.setStateToQueue();
    job2.setStateToQueue();
    jobScheduler.addJob(job1);
    jobScheduler.addJob(job2);
    jobScheduler.addWorker(worker1);
    jobScheduler.addWorker(worker2);
    jobScheduler.assignJobs();
    worker1.completeCurrentJob();
    const queuedJobs = jobScheduler.getQueuedJobs();
    const runningJobs = jobScheduler.getRunningJobs();
    const completedJobs = jobScheduler.getCompletedJobs();
    console.log("Queued jobs:", queuedJobs);
    console.log("Running jobs:", runningJobs);
    console.log("Completed jobs:", completedJobs);
}
testJobScheduling();
//# sourceMappingURL=JobScheduler.js.map