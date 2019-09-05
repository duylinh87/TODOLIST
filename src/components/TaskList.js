import React, { Component } from 'react';
import TaskItem from './TaskItem';


class TaskList extends Component {

    constructor (props) {
        super (props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    onChange = (event) =>{
        let target = event.target
        let name = target.name
        let value = target.value
       this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
       )
        this.setState ({
            [name]: value
        })
     
    }

    render() {
        let {tasks, onUpdateStatus , onDelete, onUpdate,filterName, filterStatus} = this.props
        let elmTasks = tasks.map((task,index) => {
               return (
                        <TaskItem
                            key={task.id}
                            task={task}
                            index={index }
                            onUpdateStatus = {onUpdateStatus}
                            onDelete ={ onDelete}
                            onUpdate ={onUpdate}
                        />
                    )
                })
        return (
            <div className="row mt-15">
                <div className="col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange = {this.onChange}
                                        value ={filterName}
                                   
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange = {this.onChange}
                                        value ={filterStatus}
                               
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                          {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         tasks : state.tasks,
//         filterTable : state.filterTable,
//         keyword : state.search,
//         sort : state.sort
//     }
// };

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         onFilterTable : (filter) => {
//             dispatch(actions.filterTask(filter));
//         }
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
export default TaskList