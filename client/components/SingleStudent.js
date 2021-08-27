import React from 'react';
import { connect } from "react-redux"
import { fetchSingleStudents } from "../redux/store"

const avgGrade = (tests) => {
  return Math.round(
    tests.map((test) => test.grade).reduce((x, y) => x + y) / tests.length
  );
};


class SingleStudent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStudentInReact(this.props.match.params.id)

  }

  render() {
    const student = this.props.studentInReact;
    console.log(student)
    if (student) {
      const hasTests = student.tests && student.tests.length;
      return (
        <div>
          <h3>Detail: {student.fullName}</h3>
          {hasTests ? (
            <React.Fragment>
              <h3>Average grade: {avgGrade(student.tests)}%</h3>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.tests.map((test) => {
                      return (
                        <tr key={test.id}>
                          <td>{test.subject}</td>
                          <td>{test.grade}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ) : (
            <h4>No tests on record.</h4>
          )}
        </div>
      );
    } else {
      return (
        <div>Student does not exit</div>
      )
    }




  }
};

const mapState = (state) => ({
  studentInReact: state.student
})

const mapDispatch = (dispatch) => ({
  fetchStudentInReact: (id) => dispatch(fetchSingleStudents(id))
})

export default connect(mapState, mapDispatch)(SingleStudent);
