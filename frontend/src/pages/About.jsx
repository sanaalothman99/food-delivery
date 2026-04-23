const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About FoodDash 🍔</h1>
        <p className="text-lg text-orange-100 max-w-2xl mx-auto">
          We connect hungry people with the best restaurants in town, delivering happiness to your doorstep.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '🚀', title: 'Our Mission', desc: 'To make food delivery fast, easy, and enjoyable for everyone.' },
            { icon: '❤️', title: 'Our Values', desc: 'We care about quality, speed, and customer satisfaction above all.' },
            { icon: '🌍', title: 'Our Vision', desc: 'To become the most trusted food delivery platform worldwide.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl shadow p-6 text-center">
              <p className="text-4xl mb-4">{item.icon}</p>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-orange-500 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-8">FoodDash in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10K+', label: 'Happy Customers' },
              { value: '500+', label: 'Restaurants' },
              { value: '1000+', label: 'Drivers' },
              { value: '50K+', label: 'Orders Delivered' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-orange-100 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;