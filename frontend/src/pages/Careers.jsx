const jobs = [
  { title: 'Frontend Developer', type: 'Full-time', location: 'Remote', dept: 'Engineering' },
  { title: 'Backend Developer', type: 'Full-time', location: 'Remote', dept: 'Engineering' },
  { title: 'UI/UX Designer', type: 'Full-time', location: 'On-site', dept: 'Design' },
  { title: 'Delivery Driver', type: 'Part-time', location: 'On-site', dept: 'Operations' },
  { title: 'Customer Support', type: 'Full-time', location: 'Remote', dept: 'Support' },
  { title: 'Marketing Manager', type: 'Full-time', location: 'Hybrid', dept: 'Marketing' },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our Team 🚀</h1>
        <p className="text-lg text-orange-100 max-w-2xl mx-auto">
          Help us build the future of food delivery. We're always looking for talented people.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Open Positions</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.title} className="bg-white rounded-2xl shadow p-6 flex items-center justify-between hover:shadow-md transition">
              <div>
                <h3 className="font-bold text-gray-800">{job.title}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{job.dept}</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{job.type}</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">{job.location}</span>
                </div>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;