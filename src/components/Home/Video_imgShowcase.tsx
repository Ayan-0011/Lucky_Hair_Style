import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import v1 from "../../assets/v-1.mp4"
import v2 from "../../assets/v-2.mp4"
import v3 from "../../assets/v-3.mp4"
import v4 from "../../assets/v-4.mp4"
import v5 from "../../assets/v-5.mp4"
import v6 from "../../assets/v-6.mp4"
import v7 from "../../assets/v-7.mp4"
import v8 from "../../assets/v-8.mp4"
import i0 from "../../assets/0.1.jpg"
import i00 from "../../assets/0.jpg"
import i1 from "../../assets/1.jpg"
import i2 from "../../assets/2.jpg"
import i3 from "../../assets/3.jpg"
import i4 from "../../assets/4.jpg"
import i5 from "../../assets/5.jpg"
import i6 from "../../assets/6.jpg"
import i7 from "../../assets/7.jpg"
import i8 from "../../assets/8.jpg"

const Video_imgShowcase = () => {
    return (
        <div>

            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-5">

                    {/* Heading */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-semibold mb-3 text-gray-800">
                            Our Work in Action
                        </h2>
                        <p className="text-gray-500">
                            Real transformations from our salon
                        </p>
                    </div>

                    {/* Scroll Container */}
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">

                        {[v1, v2, v3, v4, v5, v6, v7, v8].map((video, i) => (
                            <div
                                key={i}
                                className="min-w-[140px] md:min-w-[180px] h-[260px] md:h-[320px] 
          rounded-2xl overflow-hidden border border-gray-200 
          shadow-sm hover:shadow-lg transition duration-300 group relative"
                            >

                                {/* Video */}
                                <video
                                    src={video}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

                                {/* Label */}
                                <span className="absolute bottom-2 left-2 text-xs bg-white/80 px-2 py-1 rounded-md text-gray-700">
                                    Style {i + 1}
                                </span>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section */}
            <section className="py-5 bg-white">
                <div className="max-w-6xl mx-auto px-5 text-center">

                    <h2 className="text-3xl font-semibold mb-3 text-gray-800">
                        Our Work
                    </h2>
                    <p className="text-gray-500 mb-10">
                        A glimpse of our styling excellence
                    </p>

                    <Swiper
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                        effect="coverflow"
                        centeredSlides={true}
                        slidesPerView={2}
                        loop={true}
                        navigation={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                    >
                        {[i0, i00, i1, i2, i3, i4, i5, i6, i7, i8].map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="overflow-hidden rounded-xl transition duration-300">
                                    <img
                                        src={img}
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </section>
        </div>
    )
}

export default Video_imgShowcase
