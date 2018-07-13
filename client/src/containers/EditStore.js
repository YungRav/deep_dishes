import React, { Component } from "react";
import { connect } from "react-redux";
import { getStore } from "./../actions/storeActions";
import { choices } from "./../utility/tags";

class EditStore extends Component {
  state = {
    name: "",
    description: "",
    tags: []
  };
  componentDidMount() {
    this.props.getStore(this.props.match.params.id);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    //This fills in fields if existing store comes in
    if (
      Object.keys(nextProps.store.store).length > 0 //Avoids errors if user accesses this page without a profile aka empty obj
    ) {
      const store = nextProps.store.store;

      return {
        name: store.name,
        description: store.description,
        tags: store.tags
      };
    }
    return prevState;
  }
  onSubmit = e => {
    e.preventDefault();
    // axios.post("/api/stores/add", this.state).then(res => {
    //   console.log(res.data);
    //   this.props.history.push("/");
    // });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onCheck = e => {
    let tags = [...this.state.tags];
    if (e.target.checked) {
      tags.push(e.target.value);
    } else {
      tags = tags.filter(tag => tag !== e.target.value);
    }
    this.setState({ tags });
  };
  render() {
    const tagChoices = choices.map(choice => {
      return (
        <div className="form-check form-check-inline" key={choice}>
          <input
            type="checkbox"
            className="form-check-input"
            id={choice}
            value={choice}
            onChange={this.onCheck}
            checked={this.state.tags.includes(choice)}
          />
          <label className="form-check-label">{choice}</label>
        </div>
      );
    });

    return (
      <div>
        <h1>Edit STORE</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              onChange={this.onChange}
              value={this.state.description}
            />
          </div>
          {tagChoices}
          <input
            type="submit"
            value="Save"
            className="btn btn-warning btn-block"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getStore }
)(EditStore);
