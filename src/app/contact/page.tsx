export default function ContactPage() {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Contribute Your Story</h1>
        <p className="text-gray-600 mb-10 text-center">
          We’d love to hear from you! Share your journey or thoughts, and our team will reach out.
        </p>
        <form className="space-y-6 bg-white p-8 rounded-xl shadow border border-gray-200">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </main>
    );
  }
  