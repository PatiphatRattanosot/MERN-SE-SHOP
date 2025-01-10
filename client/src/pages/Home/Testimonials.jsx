const Testimonials = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row item-center justify-between gap-12">
        <div className="md:w-1/2">
          <img
            src="/images/home/testimonials/testimonials.png"
            alt="testimonials.png"
          />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What our customer say about us.</h2>
            <blockquote></blockquote>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src="/images/home/testimonials/testimonial1.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="/images/home/testimonials/testimonial2.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="/images/home/testimonials/testimonial3.png" />
                </div>
              </div>
              <div className="flex item-center gap-4 flex-wrap">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-12">
                    <span>+99</span>
                  </div>
                </div>
                <div className=" space-y-1">
                  <h5 className="text-lg font-semibold">Cusetomer Feedback</h5>
                  <div className="flex items-center gap-2">
                    <div className="rating">
                      <input
                        type="radio"
                        className="mask mask-star bg-orange-500"
                        disabled
                        defaultChecked
                      />
                    </div>
                    <span className="font-semibold">4.9</span>
                    <span className="text-[#907E7E]">(18.6k Reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
