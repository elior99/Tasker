function Filter(props) {

  return (
    <div className="row filterBar text-center">
      <div className="col-md-4 pb-2 pt-2">
        <label htmlFor="inputState" className="form-label">
          Priority:&nbsp;&nbsp;
        </label>
        <select
          id="inputState"
          className="form-select filterSelect"
          onChange={props.handlePrioritySelect}
        >
          <option value="all">All</option>
          <option value={0}>Low</option>
          <option value={1}>Medium</option>
          <option value={2}>High</option>
        </select>
      </div>
      <div className="col-md-4 pb-2 pt-2">
        <label htmlFor="inputState" className="form-label">
          {props.userType}:&nbsp;&nbsp;
        </label>
        <select
          className="form-select filterSelect"
          aria-label="Default select example"
          onChange={props.handleUserSelect}
        >
          <option value="all">All</option>
          {props.filterUsers.map((employee) => (
            <option key={employee._id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-4 pb-2 pt-2">
        <button
          onClick={props.filterData}
          type="button"
          className="btn btn-warning "
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default Filter;
