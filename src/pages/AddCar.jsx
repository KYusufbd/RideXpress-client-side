const AddCar = () => {
  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-row flex-wrap gap-5 justify-start p-3 bg-base-100">
        <h1 className="text-3xl font-bold text-secondary text-center">
          Add Car
        </h1>
      </div>
      {/* Add car form */}
      <div className="flex flex-col items-center justify-start py-6 w-full bg-base-300 min-h-screen my-0">
        <div className="card bg-base-100 w-120 max-w-full shadow-sm">
          <form className="card-body text-primary">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Car Model</span>
              </label>
              <input
                type="text"
                placeholder="Enter car model"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Enter car description"
                className="textarea textarea-bordered"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="Enter car location"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price Per Day</span>
              </label>
              <input
                type="number"
                placeholder="Enter price per day"
                className="input input-bordered"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Add Car
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
