import React from 'react'

class EditAssignment extends React.Component {
  
  state = {
    name: '',
    date: '',
    average: 0,
    description: ''
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(this.props.baseURL + "/assignments/" + this.props.assignment._id, {
      method: "PUT",
      body: JSON.stringify({ 
          name: this.state.name,
          date: this.state.date,
          average: this.state.average,
          decription: this.state.description
         }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJson => {
        this.props.editAssignment(resJson);
      })
      .then(event => {
        this.props.closeEditForm(event)
      })

      .catch(error => console.error({ Error: error }));
  };

  render () {
    return (
      <>
        <div className="form-details">
          <h3>Edit Assignment</h3>
          <form onSubmit={this.handleSubmit}>
              <input type="text" id="name" name="name" onChange={this.handleChange} placeholder={this.props.assignment.name}/>
              <input type="text" id="date" name="date" onChange={this.handleChange} placeholder={this.props.assignment.date}/>
              <input type="text" id="average" name="average" onChange={this.handleChange} placeholder={this.props.assignment.average}/>
              <input type="text" id="description" name="description" onChange={this.handleChange} placeholder={this.props.assignment.description}/>
              <input type="submit" class="btn btn-success" id="submit-button" value="Submit Edit"/>
          </form>
          <button type="button" class="btn btn-danger" id="submit-button" onClick={this.props.closeEditForm}>Cancel</button>
        </div>
      </>
    )
  }
 }
export default EditAssignment