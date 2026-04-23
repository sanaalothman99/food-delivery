const posts = [
  {
    title: 'Top 10 Foods to Order This Winter',
    date: 'April 20, 2026',
    category: 'Food',
    image: '🍲',
    desc: 'Stay warm with these delicious comfort foods perfect for cold winter nights.'
  },
  {
    title: 'How FoodDash is Changing Food Delivery',
    date: 'April 15, 2026',
    category: 'News',
    image: '🚀',
    desc: 'Learn how our platform is revolutionizing the way people order food online.'
  },
  {
    title: 'Tips for Restaurant Owners on FoodDash',
    date: 'April 10, 2026',
    category: 'Business',
    image: '🍽️',
    desc: 'Maximize your restaurant revenue with these proven tips and strategies.'
  },
  {
    title: 'Meet Our Top Delivery Drivers',
    date: 'April 5, 2026',
    category: 'Community',
    image: '🚗',
    desc: 'Stories from our amazing drivers who deliver happiness every day.'
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">FoodDash Blog 📝</h1>
        <p className="text-lg text-orange-100 max-w-2xl mx-auto">
          News, tips, and stories from the FoodDash community.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.title} className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden">
              <div className="bg-orange-50 h-40 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-500 text-sm">{post.desc}</p>
                <button className="mt-4 text-orange-500 font-semibold text-sm hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;