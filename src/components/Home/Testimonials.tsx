import React from 'react'

const Testimonials = () => {
    return (
        <>
            <section className="py-24 mt-5 bg-white">
                <div className="max-w-7xl mx-auto px-5">

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold mb-3 text-gray-800">
                            What Our Clients Say
                        </h2>
                        <p className="text-gray-500">Real experiences from our happy customers</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        {[
                            {
                                name: "Ayan Ansari",
                                review: "I booked an appointment online and everything was smooth. No waiting time and great service. Loved the experience.",
                            },
                            {
                                name: "Kasim Ansari",
                                review: "Best salon in town. Clean environment and great styling.",
                            },
                            {
                                name: "Sadan Pathan",
                                review: "Top-tier service and a very classy environment. If you’re looking for a premium salon experience, this is the place to visit.",
                            },
                        ].map((t, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-xl p-6 
          hover:shadow-xl hover:-translate-y-2 transition duration-300"
                            >

                                <h4 className="font-semibold ms-0.5 text-gray-800">{t.name}</h4>

                                {/* Stars */}
                                <div className="text-yellow-500 mb-3 text-lg">
                                    ★★★★★
                                </div>
                                <p className="text-gray-600 text-sm mb-4">"{t.review}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonials
