import React, { Component } from 'react';


class TaskForm extends Component {

     constructor ( props) {
         super(props) ;
         this.state ={
              id: '',
              name: '',
              status : true
         }
     }
     // truoc khi render lai khi an vao nut sua thi ta dung phuong thuc nay de set lai state cho no ung voi thong so công việc cần sửa
     componentWillMount () {
        if (this.props.taskEditing !==null)  {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
               status : this.props.taskEditing.status
            })
        }
     }
     // khi ta mở thêm công việc mà muốn sửa thì sẽ không được do tasks form nó đã được hiển thị và phươg thức trên sẽ ko hoạt động
     // vì thế ta phải dùng thêm phương thức này nữa
      componentWillReceiveProps (nextProps) {
        if (nextProps && nextProps.taskEditing)  {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status : nextProps.taskEditing.status
            })
        }
        // truong hợp sửa  sang thêm
        else  {
            this.setState({
                id: '',
                name: '',
                status : true
            })
        }
      }


    onCloseForm = () => {
    this.props.onCloseForm()
    }
    onChange = (event) => {
       var target = event.target;
       var name = target.name ;
       var value = target.value
       if ( name === 'status') {
           value = target.value === 'true' ? true : false;
       }
        this.setState ( {
            [name] :value
        })
    }
    // khi nhan submit thi no da luu dc su kien bien doi onchange
    onSubmit = (event) => {
        event.preventDefault()    // ngan chan luu mac dinh
        console.log ( this.state)
        this.props.onSubmit(this.state)
        this.onCloseForm()    // sau khi gui di thi ta thuc hien luon viec dong form va xoa phan vua ghi
        this.onClear() // sau khi gui di thi ta thuc hien luon viec dong form va xoa phan vua ghi
    }
    onClear = () => {
       this.setState ({
        name: '',
        status : true
       })

    }

    render() {
        let {id} = this.state
       
        return (
            <div className="panel panel-warning taskform">
                <div className="panel-heading">
                    <h3 className="panel-title">
                     
                      {id !== '' ? 'Sửa công việc' : 'Thêm công việc'}
                        <button
                            className="fa fa-times-circle text-right"
                            onClick = {this.onCloseForm}
                        ></button>
                    </h3>
                </div>
                <div className="panel-body">
                    <form  onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value = {this.state.name}
                                onChange = {this.onChange}
                            
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                             name="status"
                             value = {this.state.status}
                             onChange = {this.onChange}
                        >
                            <option value= {true} >Kích Hoạt</option>
                            <option value= {false} >Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-2"></span>Lưu Lại
                            </button>&nbsp;
                            <button 
                            type="button"
                             className="btn btn-danger"
                             onClick ={this.onClear}
                             >
                                <span className="fa fa-close mr-2 "
                                ></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



// export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
export default TaskForm;