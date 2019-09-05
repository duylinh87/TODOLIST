import React, { Component } from 'react';
import './App.css';

// https://github.com/nghiepuit/react-crud-app/tree/master/src   trang chu mau cua nghiep////////
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';

// import * as actions from './actions/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayFrom : false, 
            taskEditing: null,
            filter : {
                  name : '',
                  status : -1

            }
        }
    }

                                        // onGenerateData = () => {
                                        //     let tasks = [
                                        //         {
                                        //             id: this.generateId(),
                                        //             name: ' linh',
                                        //             status: true
                                        //         },
                                        //         {
                                        //             id: this.generateId(),
                                        //             name: ' minh',
                                        //             status: false
                                        //         },
                                        //         {
                                        //             id: this.generateId(),
                                        //             name: ' son',
                                        //             status: false
                                        //         },
                                        //     ];
                                        //     this.setState({
                                        //         tasks: tasks
                                        //     })
                                        //     localStorage.setItem ( 'tasks', JSON.stringify(tasks))                  // chu y dung SETITEM
                                        // }
 //chuc nang them moi cong viec

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateId() {
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
    }
    onToggleForm = () => {
        if ( this.state.isDisplayFrom && this.state.taskEditing !== null) {
            this.setState({
                isDisplayFrom: true ,
                taskEditing:null     
            })
        }
        else {
            this.setState({
                isDisplayFrom: !this.state.isDisplayFrom,
                taskEditing:null // dong nay để khi ta sửa trong luc mở thêm công việc mà muốn thêm tiếp thì nó sẽ trở về mặc định
            })
        }
        
        }
    onCloseForm =() => {
        this.setState({
            isDisplayFrom: false
        })
         
     }

     onSubmit = (data) => {
         console.log (data)  // khi them cong viec id chua xuat hien
        let {tasks} = this.state
        if ( data.id === '') {
            data.id = this.generateId() // den buoc nay moi gan id
            tasks.push (data)
        }
        else {
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }
       
          this.setState ({
                  tasks: tasks,
                  taskEditing:null // dong nay để trả lại trạng thái ban đầu khi ta lưu sửa . ( sưa công việc chuyển thành thêm cv)
          })
          localStorage.setItem ('tasks', JSON.stringify(tasks))
     }
     componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')){                     // chu y dung GETITEM
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
             tasks: tasks
         });
        }
     }


// //chuc nang cap nhap status

     onUpdateStatus = (id) => {
        let {tasks} = this.state ;
        let index = this.findIndex(id);
        if ( index !== -1) {
            tasks[index].status = !tasks[index].status
            this.setState({
                tasks : tasks
            });
        }
        localStorage.setItem ('tasks', JSON.stringify(tasks))
     }
     findIndex = (id) => {
        let {tasks} = this.state ;
        let resrult =-1
        tasks.forEach (( task, index) => {
            if ( task.id === id) {
                resrult = index
            }
        })     
         return resrult
     }

 // //chuc nang xoa cong viec

     onDelete = (id ) => {
         console.log(id)
        let {tasks} = this.state ;
        let index = this.findIndex(id);
        if ( index !== -1) {
            tasks.splice(index,1)
            this.setState({
                tasks : tasks
            });
        }
        localStorage.setItem ('tasks', JSON.stringify(tasks))
        this.onCloseForm()
     }

 // //chuc nang sua cong viec
    onShowForm =() => {
        this.setState({
            isDisplayFrom: true
        })
    }

    onUpdate =(id) => {
         console.log (id)
         let {tasks} = this.state ;
         let index = this.findIndex(id);
         let taskEditing = tasks[index];
         this.setState({
            taskEditing : taskEditing
        });
        this.onShowForm()
        // khi co taskEditing ta phai truyen nguoc lai vao trong taskform ( cap nhap lai them cong viec thanh sua cong vic)
    }

                // ta vẫn phai dùng hàm onSubmit để lưu lại giá trị đã sửa và truyền ra ngoài 
                // vì thế ta phải dùng đk cho hàm Submit khi nào là sửa khi nào thêm công việc
                // => ta phải dựa vào id cho việc này vì khi sửa cv mới có id còn khi thêm công việc thì id chưa có ( id nó dc truyền sau đó)
                // onSubmit = (data) => {
                //     console.log (data)  // khi them cong viec id chua xuat hien
                //    let {tasks} = this.state
                //    if ( data.id === '') {
                //        data.id = this.generateId() // den buoc nay moi gan id
                //        tasks.push (data)
                //    }
                //    else {
                //        let index = this.findIndex(data.id);
                //        tasks[index] = data;
                //    }
                
                //      this.setState ({
                //              tasks: tasks
                //      })
                //      localStorage.setItem ('tasks', JSON.stringify(tasks))
                // }
// //chuc nang tim kiem o trong list
     onFilter = (filterName, filterStatus) => {
       filterStatus = +filterStatus     // ep kieu ve number
           // khi co 2 bien tren gio ta phai khai bao state o App de truyen xuong render
           this.setState ({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
               }
           })
     }



    render() {
        let {tasks, isDisplayFrom, filter } = this.state  

         if ( filter) { // câu này chỉ là bước kiểm tra xem filer có tồn tại hay không nếu có mới thực hiện lệnh
            if (filter.name) { // kiểm tra khác null , khác undefined và khác 0
                    tasks =  tasks.filter(( task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1
                    }) 
            } 
             tasks =  tasks.filter(( task) => {
                 if (filter.status === -1 ) {
                     return task
                 }
                 else {
                     return task.status === ( filter.status === 1 ? true : false) // chu ý 1 là true 0 là false mặc định của js
                 }
             })
            } 
        let elmTaskForm = isDisplayFrom ? <TaskForm 
                                          onCloseForm = {this.onCloseForm}
                                          onSubmit = {this.onSubmit}
                                          taskEditing ={this.state.taskEditing} // được truyền từ hàm onUpdate(149)
                                          /> : ''
        return (
            <div className="container">
                <div className="text-center mb-3">
                    <h1>Quản Lý Công Việc</h1><hr />
                </div>
                <div className="row">
                    <div className={isDisplayFrom ? 'col-lg-4' : ''}>
                     {elmTaskForm}
                    </div>
                    <div className={isDisplayFrom ? 'col-lg-8' : 'col-lg-12'} >
                        <button type="button" className="btn btn-primary mb-3" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button> 
                        {/* <button type="button" className="btn btn-primary ml-3 mb-3" onClick={this.onGenerateData} >
                            <span className="fa fa-plus mr-5"></span>
                            data
                        </button> <br /> */}
                        <TaskControl />
                        <TaskList tasks= {tasks}
                         onUpdateStatus = {this.onUpdateStatus}
                         onDelete = {this.onDelete}
                         onUpdate = {this.onUpdate}
                         onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}



export default App